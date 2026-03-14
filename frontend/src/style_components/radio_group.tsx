import React from "react";
import { RadioGroup as ChakraRadioGroup, RadioGroupProps as ChakraRadioGroupProps } from "@chakra-ui/react";
/***************************************************************/

interface RadioGroupComponentProps extends Omit<ChakraRadioGroupProps, "onChange">
{
   setValue: (value: string) => void;
}

export function RadioGroup(props: RadioGroupComponentProps)
{
   const { setValue, ...otherProps } = props;

   // for radiogroup, the onChange method seems to trigger when the values List (list of all cehckbox checked) is changed
   let handleInputChange = (values: string) =>
   {
      setValue(values);
   };

   return (
      <>
         <ChakraRadioGroup
            onChange={handleInputChange}
            {...otherProps}
         />
      </>
   );
}
