import React, { ChangeEvent } from "react";
import { Select as ChakraSelect, SelectProps as ChakraSelectProps } from "@chakra-ui/react";
/***************************************************************/

interface SelectComponentProps extends Omit<ChakraSelectProps, "onChange">
{
   setValue: (value: string) => void;
   options: string[];
}

export function Select(props: SelectComponentProps)
{
   const { setValue, options, ...otherProps } = props;
   const optionItems = options.map((option) => <option key={option} value={option}>{option}</option>);

   let handleInputChange = (e: ChangeEvent<HTMLSelectElement>) =>
   {
      let inputValue = e.target.value;
      setValue(inputValue);
   };

   return (
      <>
         <ChakraSelect onChange={handleInputChange} {...otherProps}>
            {optionItems}
         </ChakraSelect>
      </>
   );
}
