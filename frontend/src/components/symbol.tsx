import React from "react";
/***************************************************************/

interface SymbolProps
{
   fontSize?: number;
   symbolOnly?: boolean;
   symbol: string | number;
   shadow?: boolean;
   style?: React.CSSProperties;
}

export function Symbol({ fontSize, symbolOnly, symbol, shadow, style, ...otherProps }: SymbolProps)
{
   let classValue = "ms ms-" + symbol;

   if (!symbolOnly)
   {
      classValue = classValue + " ms-cost";
   }

   if (shadow)
   {
      classValue = classValue + " ms-shadow";
   }

   return (
      <i style={{ fontSize: fontSize, ...style }} className={classValue} />
   );
}
