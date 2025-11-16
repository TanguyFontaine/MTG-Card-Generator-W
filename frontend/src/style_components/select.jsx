import React from 'react';
import { Select as ChakraSelect}  from "@chakra-ui/react"
/***************************************************************/

export function Select(props) {
    const { setValue, options, ...otherProps } = props;
    const optionItems = options.map((option) => <option key={option} value={option}>{option}</option>);

    let handleInputChange = (e) => {
        let inputValue = e.target.value
        setValue(inputValue)
      }

    return (
    <>
      <ChakraSelect onChange={handleInputChange} {...otherProps}> 
          {optionItems}
      </ChakraSelect>
    </>
  );
}