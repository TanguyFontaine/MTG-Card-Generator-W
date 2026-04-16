import { Request, Response } from "express";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

import dbConnectionPool from "../connection/database_connection.js";
import { USERS_TABLE_NAME, User, validateUserName } from "../datamodel/user.js";

const HASH_KEY_LENGTH = 64;

function hashPassword(password: string): string
{
   const salt = randomBytes(16).toString("hex");
   const hash = scryptSync(password, salt, HASH_KEY_LENGTH).toString("hex");
   return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string): boolean
{
   const parts = storedHash.split(":");

   // avoid crash if storedHash is not in the expected format
   if (parts.length !== 2)
      return false;

   const [salt, hash] = parts;
   const hashBuffer = Buffer.from(hash, "hex");
   const derivedKey = scryptSync(password, salt, HASH_KEY_LENGTH);

   if (hashBuffer.length !== derivedKey.length)
      return false;

   return timingSafeEqual(hashBuffer, derivedKey);
}

async function checkUsernameExists(userName: string): Promise<boolean>
{
   return dbConnectionPool.query(
      `SELECT id FROM "${USERS_TABLE_NAME}" WHERE user_name = $1`,
      [userName],
   )
      .then(result => result.rows.length > 0)
      .catch(err =>
      {
         console.error("Error checking username existence:", err);
         return false;
      });
}

async function validateNewUser(userName: string): Promise<{ isValid: boolean; errors: string[]; }>
{
   let validation = validateUserName(userName);

   if (await checkUsernameExists(userName))
   {
      validation.isValid = false;
      validation.errors.push("Username already taken");
   }
   return validation;
}

export class UserController
{
   static async register(req: Request, res: Response): Promise<void>
   {
      try
      {
         const { userName, password } = req.body;

         const validation = await validateNewUser(userName);
         if (!validation.isValid)
         {
            res.status(400).json({ error: validation.errors.join(", ") });
            return;
         }

         const hashedPassword = password ? hashPassword(password) : null;

         const result = await dbConnectionPool.query(
            `INSERT INTO "${USERS_TABLE_NAME}" (user_name, password) VALUES ($1, $2) RETURNING id, user_name`,
            [userName, hashedPassword],
         );

         const row = result.rows[0];
         const user: Omit<User, "password"> = { id: row.id, userName: row.user_name };

         console.log("User registered:", user);
         res.status(201).json(user);
      }
      catch (err)
      {
         console.error("Error registering user:", err);
         res.status(500).json({ error: "An internal error occurred during registration" });
      }
   }

   static async login(req: Request, res: Response): Promise<void>
   {
      try
      {
         const { userName, password } = req.body;

         if ((validateUserName(userName)).isValid)
         {
            const queryResult = await dbConnectionPool.query(
               `SELECT id, user_name, password FROM "${USERS_TABLE_NAME}" WHERE user_name = $1`,
               [userName],
            );

            if (queryResult.rows.length === 1)
            {
               const row = queryResult.rows[0];
               const storedPassword: string | null = row.password;

               if (storedPassword == null && password == null
                   || (storedPassword && password && verifyPassword(password, storedPassword)))
               {
                  const user: Omit<User, "password"> = { id: row.id, userName: row.user_name };

                  console.log("User logged in:", user);

                  res.status(200).json(user);
                  return;
               }
            }
         }

         res.status(400).json({ error: "Invalid username or password" });
         return;
      }
      catch (err)
      {
         console.error("Error during login:", err);
         res.status(500).json({ error: "An internal error occurred during login" });
      }
   }
}
