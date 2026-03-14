/***************************************************************/
interface ManaSymbolProps
{
   symbol?: string;
   symbolOnly?: boolean;
   shadow?: boolean;
}

export function ManaSymbol(props: ManaSymbolProps)
{
   const symbol = props.symbol || "";

   let classValue = "ms ms-" + symbol;

   if (!props.symbolOnly)
   {
      classValue = classValue + " ms-cost ";
   }

   if (props.shadow)
   {
      classValue = classValue + "ms-shadow";
   }

   return (
      <i className={classValue} />
   );
}
