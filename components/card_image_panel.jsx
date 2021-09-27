import React from 'react';
import { Image, Box, Text, HStack } from "@chakra-ui/react"
/***************************************************************/

/***************************************************************/
export function CardImagePanel(props) {

    const name = props.cardName;
    const imageFile = props.imageFile;
    const types = props.types;

    const typesItems = types.map((type) => <Text>{type}</Text>);

    return (
        <Box bg="blue.800">
            <Text>Card name : {name} </Text>
            <HStack spacing={2}><Text>types :</Text>{typesItems}</HStack>
            <Image alt={imageFile.name} src={imageFile.content}></Image>
        </Box>
    );
}
