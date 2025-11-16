import React from 'react';
import { Radio as ChakraRadio}  from "@chakra-ui/react"
/***************************************************************/

export function Radio(props) {
    const { displayLabel, ...otherProps } = props;

    return (
    <>
      <ChakraRadio
        {...otherProps}
      >
      {displayLabel}
      </ChakraRadio>
    </>
  );
}