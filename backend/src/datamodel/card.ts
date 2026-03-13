export const CARDS_TABLE_NAME: string = "cards";

const MAX_NAME_LENGTH = 120;
const MAX_MANA_COST_LENGTH = 120;
const MAX_FRAME_LENGTH = 30;
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

export class Card
{
   // Attributes
   id: number;
   name: string;
   manaCost: string;
   type: string;
   spellDescription: string;
   flavorText: string;
   frame: string;
   imageUrl: string;
   power: string;
   toughness: string;

   // Methods
   constructor(id: number = 0, name: string = "", manaCost: string = "", type: string = "",
               spellDescription: string = "", flavorText: string = "", frame: string = "",
               imageUrl: string = "", power: string = "", toughness: string = "")
   {
      this.id = id;
      this.name = name;
      this.manaCost = manaCost;
      this.type = type;
      this.spellDescription = spellDescription;
      this.flavorText = flavorText;
      this.frame = frame;
      this.imageUrl = imageUrl;
      this.power = power;
      this.toughness = toughness;
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

   validateFrame(): ValidationResult
   {
      if (this.frame == null || typeof this.frame !== "string" || this.frame.length > MAX_FRAME_LENGTH)
      {
         return { isValid: false, error: "Frame should be 30 characters or less" };
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
      if (this.imageUrl == null || this.imageUrl.length > MAX_IMAGE_URL_LENGTH)
      {
         return { isValid: false, error: "Image URL is too long" };
      }

      try
      {
         if (this.imageUrl.length > 0 && !this.imageUrl.startsWith("data:") && !this.imageUrl.startsWith("http"))
         {
            return { isValid: false, error: "Invalid image URL format" };
         }
      }
      catch (e)
      {
         return { isValid: false, error: "Invalid image URL" };
      }

      return { isValid: true };
   }

   /** Runs all field validations and returns a combined result. */
   validate(): CardValidationResult
   {
      const validations: ValidationResult[] = [
         this.validateName(),
         this.validateManaCost(),
         this.validateFrame(),
         this.validateSpellDescription(),
         this.validateFlavorText(),
         this.validateImageUrl(),
         this.validatePowerToughness(),
      ];

      const errors = validations.filter(v => !v.isValid).map(v => v.error);

      return {
         isValid: errors.length === 0,
         errors,
      };
   }
}
