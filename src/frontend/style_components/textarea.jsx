import React from 'react';
import { Textarea as ChakraTextarea}  from "@chakra-ui/react"
/***************************************************************/

export function Textarea(props) {
    let setValue = props.setValue

    let inputValue = props.inputValue
    let setInputValue = props.setInputValue

    let handleInputChange = (e) => {
      let textAreaValue = e.target.value
      setInputValue(textAreaValue);
      setValue(textAreaValue);
    }

    return (
    <>
      <ChakraTextarea
        onChange={handleInputChange}
        value={inputValue}
        size="sm"
        {...props}
      />
    </>
  );
}