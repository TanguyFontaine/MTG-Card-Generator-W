import { Symbol } from "../card_edit/symbols/symbol";
import { TextLine } from "./text_line";
import { symbols } from "../../resources/symbols";

/***************************************************************/

// Takes a spell description string with encoded symbols (e.g. "[Tap] : add [g]")
// and returns a list of plain strings and Symbol elements to be displayed.
function createDisplayableSymbols(spellDescription: string, spellFontSize: number): (string | JSX.Element)[]
{
   const leftBracketSplit = spellDescription.split("[");

   let displayableElements: (string | JSX.Element)[] = [];
   let elementIndex = 0; // Counter for unique keys
   for (let i = 0; i < leftBracketSplit.length; i++)
   {
      const rightBracketSplit = leftBracketSplit[i].split("]");

      if (rightBracketSplit.length === 2)
      {
         // a symbol has been parsed, it is the left side of the ], the right is the rest of the description
         const symbolCode = rightBracketSplit[0];
         const displayableSymbol = (symbolCode === symbols.Energy) ?
            <Symbol key={`symbol-${elementIndex++}`} symbolOnly={true} symbol={symbolCode} fontSize={spellFontSize - 12} style={{ position: "relative", top: "-25px" }} /> :
            <Symbol key={`symbol-${elementIndex++}`} symbol={symbolCode} fontSize={spellFontSize - 45} style={{ position: "relative", top: "-25px" }} />;
         displayableElements = displayableElements.concat(displayableSymbol);
         displayableElements = displayableElements.concat(rightBracketSplit[1]);
      }
      else
      {
         displayableElements = displayableElements.concat(rightBracketSplit);
      }
   }

   return displayableElements;
}

// Splits the description into lines and applies custom line height.
// Each line is split into displayable elements (symbols and text).
// Returns an array of TextLine components, each representing a line of the description.
export function transformIntoDisplayableElements(spellDescription: string, spellFontSize: number): JSX.Element[]
{
   // React requires that each element in an array has a unique key prop, here we use the line index as a key
   return spellDescription.split("\n").map((line, idx) =>
      line.trim() === ""
         ? <TextLine key={idx} isEmpty={true} />
         : <TextLine key={idx}>{createDisplayableSymbols(line, spellFontSize)}</TextLine>
   );
}
