import React from 'react';
import { Textarea as ChakraTextarea}  from "@chakra-ui/react"
/***************************************************************/

export function Textarea(props) {
    const { setValue, inputValue, setInputValue, ...otherProps } = props;

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
        {...otherProps}
      />
    </>
  );
}