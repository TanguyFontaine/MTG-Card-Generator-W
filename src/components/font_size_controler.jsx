import React from 'react';
import { Box, useControllableState } from "@chakra-ui/react"
/***************************************************************/

import { Button } from "../style_components/button"
/***************************************************************/

export function FontSizeControler(props) {
    const value = props.value
    const setValue = props.setValue

    return (
      <div>
        <Button ml="12px" onClick={() => setValue(value + 1)}>+</Button>
        <Box as="span" mx="12px">
          {value}
        </Box>
        <Button onClick={() => setValue(value - 1)}>-</Button>
      </div>
    )
  }