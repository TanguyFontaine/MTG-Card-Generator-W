import React, { useState } from 'react';
import { Textarea as ChakraTextarea, Text}  from "@chakra-ui/react"

/***************************************************************/
export function Textarea(props) {
    let [value, setValue] = useState("")

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