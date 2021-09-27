import React from 'react';
import { Image, Box, Text } from "@chakra-ui/react"
/***************************************************************/

/***************************************************************/
export function CardImagePanel(props) {

    const name = props.cardName;
    const imageFile = props.imageFile;

    return (
        <Box bg="blue.800">
            <Text>Card name : {name} </Text>
            <Image alt={imageFile.name} src={imageFile.content}></Image>
        </Box>
    );
}
