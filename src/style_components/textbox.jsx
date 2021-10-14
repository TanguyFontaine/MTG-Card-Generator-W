import React from 'react';
import { Input as ChakraTextbox}  from "@chakra-ui/react"
/***************************************************************/

export function Textbox(props) {
    //let value = props.value       TODO check why we should pass the value until here only to set value={value}.
    let setValue = props.setValue

    let handleInputChange = (e) => {
      let inputValue = e.target.value
      setValue(inputValue)
    }

    return (
    <>
      <ChakraTextbox 
        //value={value}             TODO check what it does.
        onChange={handleInputChange}
        size="sm"
        {...props}
      />
    </>
  );
}