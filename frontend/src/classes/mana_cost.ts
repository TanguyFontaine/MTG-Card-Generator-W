import { formatSymbol, removeBrackets } from "../components/utilities";
import { symbols } from "../ressources/symbols";

// returns true if all mana symbols in the list are the same as the provided hybrid symbol
function isOnlyHybridFromSymbol(manaSymbols: string[], hybridSymbol: string): boolean
{
   return manaSymbols.every(symbol => symbol === hybridSymbol);
}

class ManaCostObj
{
   colorlessAmount: number;
   otherManaSymbols: string[];

   constructor(colorlessAmount: number = -1, otherManaSymbols: string[] = [])
   {
      this.colorlessAmount = colorlessAmount;
      this.otherManaSymbols = otherManaSymbols;
   }

   addSymbol(symbol: string): ManaCostObj
   {
      return new ManaCostObj(
         this.colorlessAmount,
         [...this.otherManaSymbols, symbol]
      );
   }

   setColorlessAmount(amount: number): ManaCostObj
   {
      return new ManaCostObj(
         amount,
         this.otherManaSymbols
      );
   }

   static newEmpty(): ManaCostObj
   {
      return new ManaCostObj(-1, []);
   }

   // Saves mana cost in DB in square bracket format: [3][w][u] to preserve multi-character symbols
   toString(): string
   {
      let result = "";

      if (this.colorlessAmount > -1)
      {
         result += formatSymbol(this.colorlessAmount);
      }
      this.otherManaSymbols.forEach(symbol => { result += formatSymbol(symbol); });

      return result;
   }

   static fromString(manaCostString: string): ManaCostObj
   {
      if (!manaCostString || manaCostString === "")
         return ManaCostObj.newEmpty();

      const bracketMatches = manaCostString.match(/\[([^\]]*)\]/g);
      if (!bracketMatches)
         return ManaCostObj.newEmpty();

      let colorlessAmount = -1;
      const otherManaSymbols: string[] = [];

      bracketMatches.forEach(bracketedSymbol =>
      {
         const symbol = removeBrackets(bracketedSymbol);

         // Check if it's a number (colorless mana)
         if (/^\d+$/.test(symbol) && colorlessAmount === -1)
         {
            colorlessAmount = parseInt(symbol);
         }
         else
         {
            otherManaSymbols.push(symbol);
         }
      });

      return new ManaCostObj(colorlessAmount, otherManaSymbols);
   }

   isHybridTwoColors(): boolean
   {
      return isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridWU) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridWB) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridRW) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridRG) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridGU) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridGW) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridUB) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridUR) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridBR) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridBG) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridPhyWU) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridPhyWB) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridPhyRW) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridPhyRG) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridPhyGU) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridPhyGW) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridPhyUB) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridPhyUR) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridPhyBR) ||
             isOnlyHybridFromSymbol(this.otherManaSymbols, symbols.HybridPhyBG);
   }

}

export { ManaCostObj };
