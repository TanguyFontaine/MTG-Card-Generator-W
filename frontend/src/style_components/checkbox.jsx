import React from 'react';
import { Checkbox as ChakraCheckbox}  from "@chakra-ui/react"
/***************************************************************/

export function Checkbox(props) {
    let displayLabel = props.displayLabel

    return (
    <>
      <ChakraCheckbox
        {...props}
      >
      {displayLabel}
      </ChakraCheckbox>
    </>
  );
}