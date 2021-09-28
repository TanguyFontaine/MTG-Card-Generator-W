import React from 'react';
import { Select as ChakraSelect}  from "@chakra-ui/react"

/***************************************************************/
export function Select(props) {
    let setValue = props.setValue

    const options = props.options
    const optionItems = options.map((option) => <option value={option}>{option}</option>);

    let handleInputChange = (e) => {
        let inputValue = e.target.value
        setValue(inputValue)
      }

    return (
    <>
      <ChakraSelect onChange={handleInputChange} {...props}> 
          {optionItems}
      </ChakraSelect>
    </>
  );
}