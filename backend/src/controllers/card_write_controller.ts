import { Request, Response } from "express";
import { CARDS_TABLE_NAME, Card } from "../datamodel/card.js";
import dbConnectionPool from "../connection/database_connection.js";

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

export class CardWriteController
{
   static async insertCard(req: Request, res: Response): Promise<void>
   {
      console.log("Received POST request with data:", req.body);

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

         const insertQuery = `
            INSERT INTO "${CARDS_TABLE_NAME}"
               (name, manacost, type, spelldescription, flavortext, cardframe, imageurl, power, toughness)
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

         console.log("Card saved successfully:", result.rows[0]);
         res.status(201).json(result.rows[0]);
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
               name = $2, manacost = $3, type = $4, spelldescription = $5,
               flavortext = $6, cardframe = $7, imageurl = $8, power = $9, toughness = $10
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
