import React from 'react';
import { CheckboxGroup as ChakraCheckboxGroup}  from "@chakra-ui/react"
/***************************************************************/

export function CheckboxGroup(props) {
    const { setValue, ...otherProps } = props;

    // for checkboxgroup, the onChange method seems to trigger when the values List (list of all cehckbox checked) is changed 
    let handleInputChange = (values) => {
      setValue(values)
    }

    return (
    <>
      <ChakraCheckboxGroup
        onChange={handleInputChange}
        {...otherProps}
      />
    </>
  );
}