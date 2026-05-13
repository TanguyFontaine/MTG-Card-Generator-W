import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { FontSizeStepButton } from "./font_size_step_button";
import { FontSizeInput } from "./font_size_input";
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
         <FontSizeStepButton onStep={() => setValue(value - 1)}>-</FontSizeStepButton>
         <FontSizeInput value={value} setValue={setValue} />
         <FontSizeStepButton onStep={() => setValue(value + 1)}>+</FontSizeStepButton>
      </HStack>
   );
}
