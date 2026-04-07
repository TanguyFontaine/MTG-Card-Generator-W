import { formatSymbol, removeBrackets } from "../components/utilities";

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
}

export { ManaCostObj };
