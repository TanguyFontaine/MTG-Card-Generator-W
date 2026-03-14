import { ChangeEvent } from "react";
import { Input as ChakraTextbox, InputProps as ChakraInputProps } from "@chakra-ui/react";
/***************************************************************/

interface TextboxComponentProps extends Omit<ChakraInputProps, "onChange">
{
   setValue: (value: string) => void;
}

export function Textbox(props: TextboxComponentProps)
{
   const { setValue, ...otherProps } = props;

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
   {
      const inputValue = e.target.value;
      setValue(inputValue);
   };

   return (
      <>
         <ChakraTextbox
            onChange={handleInputChange}
            size="sm"
            {...otherProps}
         />
      </>
   );
}
