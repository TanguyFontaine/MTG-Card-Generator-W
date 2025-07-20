import React from 'react';
import { RadioGroup as ChakraRadioGroup}  from "@chakra-ui/react"
/***************************************************************/

export function RadioGroup(props) {
    let setValue = props.setValue

    // for radiogroup, the onChange method seems to trigger when the values List (list of all cehckbox checked) is changed 
    let handleInputChange = (values) => {
      setValue(values)
    }

    return (
    <>
      <ChakraRadioGroup
        onChange={handleInputChange}
        {...props}
      />
    </>
  );
}