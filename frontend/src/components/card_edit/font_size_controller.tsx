import { HStack, Box } from "@chakra-ui/react";
/***************************************************************/

import { Button } from "../../style_components/button";
/***************************************************************/

interface FontSizeControllerProps
{
   value: number;
   setValue: (value: number) => void;
}

export function FontSizeController(props: FontSizeControllerProps)
{
   const value = props.value;
   const setValue = props.setValue;

   return (
      <HStack spacing={0}>
         <Button size="xs" variant="ghost" minW="28px" onClick={() => setValue(value - 1)}>
            -
         </Button>
         <Box as="span" mx={1} fontSize="13px" color="brand.textSecondary" minW="24px" textAlign="center">
            {value}
         </Box>
         <Button size="xs" variant="ghost" minW="28px" onClick={() => setValue(value + 1)}>
            +
         </Button>
      </HStack>
   );
}
