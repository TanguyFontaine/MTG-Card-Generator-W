import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
/***************************************************************/

export function Button(props: ChakraButtonProps)
{
   return (
      <ChakraButton size="md" {...props} />
   );
}
