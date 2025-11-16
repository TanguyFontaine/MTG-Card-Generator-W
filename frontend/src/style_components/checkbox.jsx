import React from 'react';
import { Checkbox as ChakraCheckbox}  from "@chakra-ui/react"
/***************************************************************/

export function Checkbox(props) {
    const { displayLabel, ...otherProps } = props;

    return (
    <>
      <ChakraCheckbox
        {...otherProps}
      >
      {displayLabel}
      </ChakraCheckbox>
    </>
  );
}