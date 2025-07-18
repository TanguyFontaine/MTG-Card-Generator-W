import React from 'react';
import { Input as ChakraTextbox}  from "@chakra-ui/react"
/***************************************************************/

export function Textbox(props) {
    let setValue = props.setValue

    let handleInputChange = (e) => {
      let inputValue = e.target.value
      setValue(inputValue)
    }

    return (
    <>
      <ChakraTextbox 
        onChange={handleInputChange}
        size="sm"
        {...props}
      />
    </>
  );
}