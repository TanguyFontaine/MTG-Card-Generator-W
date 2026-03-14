import { Checkbox as ChakraCheckbox, CheckboxProps as ChakraCheckboxProps } from "@chakra-ui/react";
/***************************************************************/

interface CheckboxComponentProps extends ChakraCheckboxProps
{
   displayLabel?: string;
}

export function Checkbox(props: CheckboxComponentProps)
{
   const { displayLabel, ...otherProps } = props;

   return (
      <>
         <ChakraCheckbox
            {...otherProps}
         >
            {displayLabel}
         </ChakraCheckbox>
      </>
   );
}
