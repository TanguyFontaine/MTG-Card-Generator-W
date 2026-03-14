import React from "react";
import { Text as ChakraText, TextProps as ChakraTextProps } from "@chakra-ui/react";
/***************************************************************/

export function Text(props: ChakraTextProps)
{
   return (
      <ChakraText {...props} />
   );
}
