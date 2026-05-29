import type { FrameCustomization } from "./frame_customization.js";

export const CARDS_TABLE_NAME: string = "cards";

const MAX_NAME_LENGTH = 120;
const MAX_FRAME_COLOR_LENGTH = 5;
const MAX_MANA_COST_LENGTH = 120;
const MAX_POWER_TOUGHNESS_LENGTH = 10;
const MAX_TEXT_LENGTH = 2000;
const MAX_IMAGE_URL_LENGTH = 255;

// Result of a single field validation
interface ValidationResult
{
   isValid: boolean;
   error?: string;
}

interface CardValidationResult
{
   isValid: boolean;
   errors: (string | undefined)[];
}

const VALID_FRAME_TYPES = ["normal", "level_up"];

export class Card
{
   // Attributes
   id: number;
   name: string;
   manaCost: string;
   type: string;
   spellDescription: string;
   flavorText: string;
   imageUrl: string;
   power: string;
   toughness: string;
   frameCustomization: FrameCustomization;
   specialFrameData: unknown | null;
   fontSizesMainFields: Record<string, number>;
   // Font sizes for main text fields of normal cards (name, types, spell, flavorText, powerToughness).
   // For special frame cards (e.g. level-up), field-specific font sizes are stored in special_frame_data.

   // Methods
   constructor(
      id: number = 0,
      name: string = "",
      manaCost: string = "",
      type: string = "",
      spellDescription: string = "",
      flavorText: string = "",
      imageUrl: string = "",
      power: string = "",
      toughness: string = "",
      frameCustomization: FrameCustomization =
         { frameColorOverride: null, withVehicleFrame: false, withColorIndicator: false, frameType: "normal" },
      specialFrameData: unknown | null = null,
      fontSizesMainFields: Record<string, number> = {},
   )
   {
      this.id = id;
      this.name = name;
      this.manaCost = manaCost;
      this.type = type;
      this.spellDescription = spellDescription;
      this.flavorText = flavorText;
      this.imageUrl = imageUrl;
      this.power = power;
      this.toughness = toughness;
      this.frameCustomization = frameCustomization;
      this.specialFrameData = specialFrameData;
      this.fontSizesMainFields = fontSizesMainFields;
   }

   validateName(): ValidationResult
   {
      if (this.name == null || this.name.trim().length === 0)
      {
         return { isValid: false, error: "Card name is required" };
      }
      if (this.name.length > MAX_NAME_LENGTH)
      {
         return { isValid: false, error: "Card name must be 120 characters or less" };
      }
      return { isValid: true };
   }

   validateManaCost(): ValidationResult
   {
      if (this.manaCost == null || typeof this.manaCost !== "string" || this.manaCost.length > MAX_MANA_COST_LENGTH)
      {
         return { isValid: false, error: "Mana cost should be 120 characters or less" };
      }
      return { isValid: true };
   }

   validatePowerToughness(): ValidationResult
   {
      if (this.power == null || typeof this.power !== "string" || this.power.length > MAX_POWER_TOUGHNESS_LENGTH)
      {
         return { isValid: false, error: "Power must be 10 characters or less" };
      }
      if (this.toughness == null || typeof this.toughness !== "string" || this.toughness.length > MAX_POWER_TOUGHNESS_LENGTH)
      {
         return { isValid: false, error: "Toughness must be 10 characters or less" };
      }
      return { isValid: true };
   }

   validateSpellDescription(): ValidationResult
   {
      if (this.spellDescription == null || typeof this.spellDescription !== "string" || this.spellDescription.length > MAX_TEXT_LENGTH)
      {
         return { isValid: false, error: "Spell description must be 2000 characters or less" };
      }
      return { isValid: true };
   }

   validateFlavorText(): ValidationResult
   {
      if (this.flavorText == null || typeof this.flavorText !== "string" || this.flavorText.length > MAX_TEXT_LENGTH)
      {
         return { isValid: false, error: "Flavor text must be 2000 characters or less" };
      }
      return { isValid: true };
   }

   validateImageUrl(): ValidationResult
   {
      // allow empty image URL, but if provided it must be a valid URL format and not too long
      if (this.imageUrl != null && this.imageUrl.length > 0 && !this.imageUrl.startsWith("http"))
      {
         return { isValid: false, error: "Invalid image URL format" };
      }
      else if (this.imageUrl != null && this.imageUrl.length > MAX_IMAGE_URL_LENGTH)
      {
         return { isValid: false, error: "Image URL is too long" };
      }

      return { isValid: true };
   }

   validateFrameCustomization(): ValidationResult
   {
      const colorOverride = this.frameCustomization.frameColorOverride;
      if (colorOverride !== null)
      {
         if (typeof colorOverride !== "string" || colorOverride.length > MAX_FRAME_COLOR_LENGTH)
         {
            return { isValid: false, error: `Frame color override must be at most ${MAX_FRAME_COLOR_LENGTH} characters` };
         }
         if (colorOverride !== "C" && !/^[WUBRG]+$/.test(colorOverride))
         {
            return { isValid: false, error: "Frame color override must be a valid WUBRG string or \"C\" for colorless" };
         }
      }
      return { isValid: true };
   }

   validateLevelUpData(): ValidationResult
   {
      const data = this.specialFrameData;

      if (data !== null)
      {
         const levelData = data as { levelAbilities?: unknown[] };
         if (!Array.isArray(levelData.levelAbilities) || levelData.levelAbilities.length !== 3)
            return { isValid: false, error: "Level-up data must have exactly 3 level abilities" };

         for (const ability of levelData.levelAbilities)
         {
            if (typeof ability !== "object" || ability === null)
               return { isValid: false, error: "Each level ability must be an object" };

            const ab = ability as Record<string, unknown>;
            if (typeof ab.spellDescription !== "string" || ab.spellDescription.length > MAX_TEXT_LENGTH)
               return { isValid: false, error: "Level ability text must be 2000 characters or less" };
            if (typeof ab.power !== "string" || ab.power.length > MAX_POWER_TOUGHNESS_LENGTH)
               return { isValid: false, error: "Level ability power must be 10 characters or less" };
            if (typeof ab.toughness !== "string" || ab.toughness.length > MAX_POWER_TOUGHNESS_LENGTH)
               return { isValid: false, error: "Level ability toughness must be 10 characters or less" };
         }
      }
      return { isValid: true };
   }

   validateSpecialFrameData(): ValidationResult
   {
      const frameType = this.frameCustomization.frameType;
      const data = this.specialFrameData;

      if (!VALID_FRAME_TYPES.includes(frameType))
         return { isValid: false, error: `Frame type must be one of: ${VALID_FRAME_TYPES.join(", ")}` };

      if (frameType === "level_up")
      {
         return this.validateLevelUpData();
      }
      else if (data !== null && data !== undefined)
      {
         return { isValid: false, error: "Non-level-up cards must not have special frame data" };
      }

      return { isValid: true };
   }

   validate(): CardValidationResult
   {
      const validations: ValidationResult[] = [
         this.validateName(),
         this.validateManaCost(),
         this.validateSpellDescription(),
         this.validateFlavorText(),
         this.validateImageUrl(),
         this.validatePowerToughness(),
         this.validateFrameCustomization(),
         this.validateSpecialFrameData(),
      ];

      const errors = validations.filter(v => !v.isValid).map(v => v.error);

      return {
         isValid: errors.length === 0,
         errors,
      };
   }
}
