import { Request, Response } from "express";

import dbConnectionPool from "../connection/database_connection.js";
import { Card, CARDS_TABLE_NAME } from "../datamodel/card.js";
import { isValidUserId } from "../datamodel/user.js";

/** Builds a Card instance from a raw database row. */
function buildCardFromRow(row: Record<string, unknown>): Card
{
   return new Card(
      row.id as number,
      row.name as string,
      row.mana_cost as string,
      row.type as string,
      row.spell_description as string,
      row.flavor_text as string,
      row.card_frame as string,
      row.image_url as string,
      row.power as string,
      row.toughness as string,
   );
}

export class CardReadController
{
   static async getAllCards(req: Request, res: Response): Promise<void>
   {
      const userId = req.query.userId;

      if (!isValidUserId(userId))
      {
         res.status(400).json({ error: "Not registered as a user. Please log in or register." });
         return;
      }

      try
      {
         const selectQuery: string = `SELECT * FROM "${CARDS_TABLE_NAME}" WHERE user_id = $1`;
         const params = [userId];

         const result = await dbConnectionPool.query(selectQuery, params);
         const cards: Card[] = result.rows.map((row: Record<string, unknown>) => buildCardFromRow(row));
         res.json(cards);
      }
      catch (err)
      {
         console.error("Error fetching all cards:", err);
         res.status(500).json({ error: "An internal error occurred while fetching cards" });
      }
   }

   static async getCardById(req: Request, res: Response): Promise<void>
   {
      try
      {
         const cardId = req.params.id;
         const selectQuery : string = `SELECT * FROM "${CARDS_TABLE_NAME}" WHERE id = $1`;
         const result = await dbConnectionPool.query(selectQuery, [cardId]);

         if (result.rows.length === 0)
         {
            res.status(404).json({ error: "Card not found" });
            return;
         }

         const row = result.rows[0] as Record<string, unknown>;
         res.json(buildCardFromRow(row));
      }
      catch (err)
      {
         console.error("Error fetching card by ID:", err);
         res.status(500).json({ error: "An internal error occurred while fetching the card" });
      }
   }
}
