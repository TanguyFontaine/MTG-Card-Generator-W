import React, { useState } from 'react';
import { Textarea as ChakraTextarea, Text}  from "@chakra-ui/react"

/***************************************************************/
export function Textarea(props) {
    let setValue = props.setValue

    let handleInputChange = (e) => {
      let inputValue = e.target.value
      setValue(inputValue)
    }

    return (
    <>
      <ChakraTextarea
        onChange={handleInputChange}
        size="sm"
        {...props}
      />
    </>
  );
}