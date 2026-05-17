// Super Type Constants
const LEGENDARY = "Legendary";
const SNOW = "Snow";
const BASIC = "Basic";
const TOKEN = "Token";

// Card Type Constants
const CREATURE = "Creature";
const ARTIFACT = "Artifact";
const ENCHANTMENT = "Enchantment";
const PLANESWALKER = "Planeswalker";
const INSTANT = "Instant";
const SORCERY = "Sorcery";
const LAND = "Land";
const KINDRED = "Kindred";
const BATTLE = "Battle";

// Predefined card type arrays using constants
const SUPER_TYPES: string[] = [
   LEGENDARY,
   SNOW,
   BASIC,
   TOKEN,
];

const CARD_TYPES: string[] = [
   CREATURE,
   ARTIFACT,
   ENCHANTMENT,
   PLANESWALKER,
   INSTANT,
   SORCERY,
   LAND,
   KINDRED,
   BATTLE,
];

class CardTypeObj
{
   superTypes: string[];
   types: string[];
   subTypes: string;

   constructor(superTypes: string[] = [], types: string[] = [], subTypes: string = "")
   {
      this.superTypes = Array.isArray(superTypes) ? superTypes : [];
      this.types = Array.isArray(types) ? types : [];
      this.subTypes = typeof subTypes === "string" ? subTypes : "";
   }

   static newEmpty(): CardTypeObj
   {
      return new CardTypeObj([], [], "");
   }

   setTypes(types: string[]): CardTypeObj
   {
      return new CardTypeObj(
         this.superTypes,
         Array.isArray(types) ? types : [],
         this.subTypes
      );
   }

   setSuperTypes(superTypes: string[]): CardTypeObj
   {
      return new CardTypeObj(
         Array.isArray(superTypes) ? superTypes : [],
         this.types,
         this.subTypes
      );
   }

   setSubTypes(subTypes: string): CardTypeObj
   {
      return new CardTypeObj(
         this.superTypes,
         this.types,
         subTypes
      );
   }

   addSuperType(superType: string): CardTypeObj
   {
      if (!SUPER_TYPES.includes(superType) || this.superTypes.includes(superType))
         return this;

      return new CardTypeObj(
         this.superTypes.concat([superType]),
         this.types,
         this.subTypes
      );
   }

   addType(type: string): CardTypeObj
   {
      if (!CARD_TYPES.includes(type) || this.types.includes(type))
         return this;

      return new CardTypeObj(
         this.superTypes,
         this.types.concat([type]),
         this.subTypes
      );
   }

   toString(): string
   {
      const allParts = [
         ...this.superTypes,
         ...this.types,
         this.subTypes.trim(), // Remove beginning/trailing spaces
      ].filter(Boolean); // Filter out any empty strings

      return allParts.join(" ");
   }

   static fromString(typeString: string): CardTypeObj
   {
      let result = CardTypeObj.newEmpty();

      if (!typeString || typeString.trim() === "")
         return result;

      const words = typeString.trim().split(/\s+/).filter(Boolean);

      for (let word of words)
      {
         if (SUPER_TYPES.includes(word))
            result = result.addSuperType(word);
         else if (CARD_TYPES.includes(word))
            result = result.addType(word);
         else
            result = result.setSubTypes(result.subTypes + " " + word);
      }

      return result;
   }

   static getAvailableSuperTypes(): string[]
   {
      return [...SUPER_TYPES];
   }

   static getAvailableTypes(): string[]
   {
      return [...CARD_TYPES];
   }

   // removeType(type) not needed yet
   // removeSuperType(superType) not needed yet
}

export {
   CardTypeObj,
   SUPER_TYPES,
   CARD_TYPES,
   LEGENDARY,
   SNOW,
   BASIC,
   TOKEN,
   CREATURE,
   ARTIFACT,
   ENCHANTMENT,
   PLANESWALKER,
   INSTANT,
   SORCERY,
   LAND,
   BATTLE,
   KINDRED,
};
