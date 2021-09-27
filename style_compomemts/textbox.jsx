import React from 'react';
import { Input as ChakraTextbox, Text}  from "@chakra-ui/react"

/***************************************************************/
export function Textbox(props) {
    let value = props.value
    let setValue = props.setValue

    let handleInputChange = (e) => {
      let inputValue = e.target.value
      setValue(inputValue)
    }

    return (
    <>
      <ChakraTextbox
        value={value}
        onChange={handleInputChange}
        size="sm"
        {...props}
      />
    </>
  );
}