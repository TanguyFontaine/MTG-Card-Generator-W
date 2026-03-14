import { Box } from "@chakra-ui/react";
/***************************************************************/

import { Button } from "../style_components/button";
/***************************************************************/

interface FontSizeControlerProps
{
   value: number;
   setValue: (value: number) => void;
}

export function FontSizeControler(props: FontSizeControlerProps)
{
   const value = props.value;
   const setValue = props.setValue;

   return (
      <div>
         <Button ml="12px" onClick={() => setValue(value - 1)}>-</Button>
         <Box as="span" mx="12px">
            {value}
         </Box>
         <Button onClick={() => setValue(value + 1)}>+</Button>
      </div>
   );
}
