import { Box } from "@chakra-ui/react";
/***************************************************************/

import { Symbol } from "./symbol";
/***************************************************************/

interface SymbolButtonProps
{
   symbol: string | number;
   symbolOnly?: boolean;
   shadow?: boolean;
   fontSize?: number;
   setValue: () => void;
}

export function SymbolButton(props: SymbolButtonProps)
{
   const { setValue, symbol, symbolOnly, shadow, ...otherProps } = props;

   return (
      <Box as="button" fontSize={20} onClick={setValue} {...otherProps}>
         <Symbol symbol={symbol} symbolOnly={symbolOnly} shadow={shadow || true} />
      </Box>
   );
}
