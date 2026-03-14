import { CheckboxGroup as ChakraCheckboxGroup, CheckboxGroupProps as ChakraCheckboxGroupProps } from "@chakra-ui/react";
/***************************************************************/

interface CheckboxGroupComponentProps extends Omit<ChakraCheckboxGroupProps, "onChange">
{
   setValue: (values: (string | number)[]) => void;
   name?: string;
}

export function CheckboxGroup(props: CheckboxGroupComponentProps)
{
   const { setValue, ...otherProps } = props;

   // for checkboxgroup, the onChange method seems to trigger when the values list (list of all checkbox checked) is changed
   const handleInputChange = (values: (string | number)[]) =>
   {
      setValue(values);
   };

   return (
      <>
         <ChakraCheckboxGroup
            onChange={handleInputChange}
            {...otherProps}
         />
      </>
   );
}
