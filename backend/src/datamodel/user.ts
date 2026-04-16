export const USERS_TABLE_NAME: string = "users";
export const USER_CARDS_TABLE_NAME: string = "user_cards";

const MAX_USERNAME_LENGTH = 60;
const MIN_USERNAME_LENGTH = 2;

export interface User
{
   id: number;
   userName: string;
   password: string | null; // Optional password for now
}

interface UserValidationResult
{
   isValid: boolean;
   errors: string[];
}

// userId can be a string (from query params) or a number (from JSON body)
export function isValidUserId(userId: unknown): boolean
{
   if (userId === null || userId === undefined)
   {
      return false;
   }

   const parsed = typeof userId === "number" ? userId : Number(userId);

   return Number.isInteger(parsed) && parsed > 0;
}

export function validateUserName(userName: string): UserValidationResult
{
   const errors: string[] = [];

   if (!userName || userName.trim().length === 0)
   {
      errors.push("Username is required");
   }
   else if (userName.length < MIN_USERNAME_LENGTH)
   {
      errors.push(`Username must be at least ${MIN_USERNAME_LENGTH} characters`);
   }
   else if (userName.length > MAX_USERNAME_LENGTH)
   {
      errors.push(`Username must be at most ${MAX_USERNAME_LENGTH} characters`);
   }

   return { isValid: errors.length === 0, errors };
}
