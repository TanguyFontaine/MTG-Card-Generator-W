import React from "react";
import { Radio as ChakraRadio, RadioProps as ChakraRadioProps } from "@chakra-ui/react";
/***************************************************************/

interface RadioComponentProps extends ChakraRadioProps
{
   displayLabel?: string;
}

export function Radio(props: RadioComponentProps)
{
   const { displayLabel, ...otherProps } = props;

   return (
      <>
         <ChakraRadio
            {...otherProps}
         >
            {displayLabel}
         </ChakraRadio>
      </>
   );
}
