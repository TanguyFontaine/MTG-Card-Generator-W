import React from 'react';
import { Radio as ChakraRadio}  from "@chakra-ui/react"
/***************************************************************/

export function Radio(props) {
    let displayLabel = props.displayLabel

    return (
    <>
      <ChakraRadio
        {...props}
      >
      {displayLabel}
      </ChakraRadio>
    </>
  );
}