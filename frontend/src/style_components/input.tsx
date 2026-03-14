import React from "react";
import { Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
/***************************************************************/

export function Input(props: ChakraInputProps)
{
   return (
      <ChakraInput {...props} />
   );
}
