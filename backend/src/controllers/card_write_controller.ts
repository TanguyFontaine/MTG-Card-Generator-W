import { Request, Response } from "express";
import { CARDS_TABLE_NAME, Card } from "../datamodel/card.js";
import { USER_CARDS_TABLE_NAME } from "../datamodel/user.js";
import dbConnectionPool from "../connection/database_connection.js";
import { isValidUserId } from "../datamodel/user.js";

interface CardRequestBody
{
   name?: string;
   manaCost?: string;
   type?: string;
   spellDescription?: string;
   flavorText?: string;
   frame?: string;
   imageUrl?: string;
   power?: string;
   toughness?: string;
}

function buildCardFromRequestBody(cardData: CardRequestBody, cardId: number = 0): Card
{
   return new Card(
      cardId,
      cardData.name || "",
      cardData.manaCost || "",
      cardData.type || "",
      cardData.spellDescription || "",
      cardData.flavorText || "",
      cardData.frame || "",
      cardData.imageUrl || "",
      cardData.power || "",
      cardData.toughness || "",
   );
}

function validateCardOwnership(cardId: number, userId: number): Promise<boolean>
{
   const ownershipCheckQuery = `SELECT id FROM "${USER_CARDS_TABLE_NAME}" WHERE card_id = $1 AND user_id = $2`;

   return dbConnectionPool.query(ownershipCheckQuery, [cardId, userId])
      .then(result => result.rows.length == 1)
      .catch(err =>
      {
         console.error("Error validating card ownership:", err);
         return false;
      });
}

export class CardWriteController
{
   static async insertCard(req: Request, res: Response): Promise<void>
   {
      console.log("Received POST request with data:", req.body);

      const userId = req.body.userId;
      if (!isValidUserId(userId))
      {
         res.status(400).json({ error: "Not registered as a user. Please log in or register." });
         return;
      }

      try
      {
         const card = buildCardFromRequestBody(req.body);

         const validation = card.validate();
         if (!validation.isValid)
         {
            const errorMessage = `Card validation failed: ${validation.errors.join(", ")}`;
            res.status(400).json({error: errorMessage, details: validation.errors,});
            return;
         }

         // Save the card to the database ('cards' table) and get the generated ID
         const insertQuery = `
            INSERT INTO "${CARDS_TABLE_NAME}"
               (name, mana_cost, type, spell_description, flavor_text, card_frame, image_url, power, toughness)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`;

         const result = await dbConnectionPool.query(insertQuery,
         [
            card.name,
            card.manaCost,
            card.type,
            card.spellDescription,
            card.flavorText,
            card.frame,
            card.imageUrl,
            card.power,
            card.toughness,
         ]);

         const savedCard = result.rows[0];

         // Link the card to the user via the user_cards junction table
         await dbConnectionPool.query(
               `INSERT INTO "${USER_CARDS_TABLE_NAME}" (card_id, user_id) VALUES ($1, $2)`,
               [savedCard.id, userId],
            );

         console.log("Card saved successfully:", savedCard);
         res.status(201).json(savedCard);
      }
      catch (err)
      {
         console.error("Error saving card:", err);
         res.status(500).json({ error: "An internal server error occurred" });
      }
   }

   static async updateCard(req: Request, res: Response): Promise<void>
   {
      const cardId: number = parseInt(req.params.id);

      const userId = req.body.userId;
      if (!isValidUserId(userId))
      {
         res.status(400).json({ error: "Not registered as a user. Please log in or register." });
         return;
      }
      if (!await validateCardOwnership(cardId, userId))
      {
         res.status(403).json({ error: "Error updating card: You do not own this card." });
         return;
      }

      try
      {
         const card = buildCardFromRequestBody(req.body, cardId);

         const validation = card.validate();
         if (!validation.isValid)
         {
            const errorMessage = `Card validation failed: ${validation.errors.join(", ")}`;
            res.status(400).json({ error: errorMessage, details: validation.errors});
            return;
         }

         const updateQuery = `
            UPDATE "${CARDS_TABLE_NAME}" SET
               name = $2, mana_cost = $3, type = $4, spell_description = $5,
               flavor_text = $6, card_frame = $7, image_url = $8, power = $9, toughness = $10
            WHERE id = $1
            RETURNING *`;

         const result = await dbConnectionPool.query(updateQuery, [
            cardId,
            card.name,
            card.manaCost,
            card.type,
            card.spellDescription,
            card.flavorText,
            card.frame,
            card.imageUrl,
            card.power,
            card.toughness,
         ]);

         if (result.rows.length === 0)
         {
            res.status(404).json({ error: "Card not found" });
            return;
         }

         console.log("Card updated successfully:", result.rows[0]);
         res.json(result.rows[0]);
      }
      catch (err)
      {
         console.error("Error updating card:", err);
         res.status(500).json({ error: "An internal server error occurred" });
      }
   }

   static async deleteCard(_req: Request, res: Response): Promise<void>
   {
      // TODO: Implement delete functionality
      res.status(501).json({ error: "Delete operation not yet implemented" });
   }
}
