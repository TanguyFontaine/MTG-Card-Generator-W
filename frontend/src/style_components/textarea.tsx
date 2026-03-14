import React, { ChangeEvent } from "react";
import { Textarea as ChakraTextarea, TextareaProps as ChakraTextareaProps } from "@chakra-ui/react";
/***************************************************************/

interface TextareaComponentProps extends Omit<ChakraTextareaProps, "onChange">
{
   setValue: (value: string) => void;
   inputValue: string;
   setInputValue: (value: string) => void;
}

export function Textarea(props: TextareaComponentProps)
{
   const { setValue, inputValue, setInputValue, ...otherProps } = props;

   let handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
   {
      let textAreaValue = e.target.value;
      setInputValue(textAreaValue);
      setValue(textAreaValue);
   };

   return (
      <>
         <ChakraTextarea
            onChange={handleInputChange}
            value={inputValue}
            size="sm"
            {...otherProps}
         />
      </>
   );
}
