import React, { useState } from 'react';
import { Textarea as ChakraTextarea, Text}  from "@chakra-ui/react"

/***************************************************************/
export function Textarea(props) {
    let value = props.value
    let setValue = props.setValue

    let handleInputChange = (e) => {
      let inputValue = e.target.value
      setValue(inputValue)
    }

    return (
    <>
      <ChakraTextarea
        value={value}
        onChange={handleInputChange}
        size="sm"
        {...props}
      />
    </>
  );
}