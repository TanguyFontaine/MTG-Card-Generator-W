import React from 'react';
import { Image, Box, Text, HStack } from "@chakra-ui/react"
/***************************************************************/

/***************************************************************/
export function CardImagePanel(props) {

    const name = props.cardName
    const imageFile = props.imageFile
    const types = props.types
    const superTypes = props.superTypes
    const subTypes = props.subTypes
    const chosenCardFrame = props.cardFrame

    const typesItems = types.map((type) => <Text>{type}</Text>);
    const superTypesItems = superTypes.map((superTypes) => <Text>{superTypes}</Text>);

    return (
        <Box bg="blue.800">
            <Text>Card name : {name} </Text>
            <HStack spacing={2}><Text>types :</Text>{typesItems}</HStack>
            <HStack spacing={2}><Text>super types :</Text>{superTypesItems}</HStack>
            <Text>Sub types : {subTypes} </Text>
            <Text>Card frame : {chosenCardFrame} </Text>
            <Image alt={imageFile.name} src={imageFile.content}></Image>
        </Box>
    );
}
