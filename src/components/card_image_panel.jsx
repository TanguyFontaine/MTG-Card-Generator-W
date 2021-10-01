import React from 'react';
import { Image, Box, HStack } from "@chakra-ui/react"
/***************************************************************/

import { Text } from "../style_components/text"

/***************************************************************/
export function CardImagePanel(props) {

    const name = props.cardName
    const imageFileContent = props.imageFile.content
    const imageFileName = props.imageFile.name
    const types = props.types
    const superTypes = props.superTypes
    const subTypes = props.subTypes
    const chosenCardFrame = props.cardFrame
    const spellDescription = props.spellDescription
    const flavorText = props.flavorText
    const power = props.power
    const toughness = props.toughness
    const loyalty = props.loyalty

    const typesItems = types.map((type) => <Text>{type}</Text>);
    const superTypesItems = superTypes.map((superTypes) => <Text>{superTypes}</Text>);

    function fileExtensionIsValid(imageFileName) {

        const athorizedFileExtensions = ["png", "jpeg", "jpg", "gif", "webp"]

        const splitFileName = imageFileName.split('.')
        return (athorizedFileExtensions.some(ext =>(ext === splitFileName[splitFileName.length - 1].toLowerCase())));
      }

    function DisplayImage(props) {
        const imageFileName = props.imageFileName
        const imageFileContent = props.imageFileContent

        // Do not display the error panel while an image has not been selected
        if (imageFileName === "" || fileExtensionIsValid(imageFileName)) {
            return (
                <Image alt={imageFileName} src={imageFileContent}></Image>
            );
        }
        return (<div>Invalid image file : supported extensions are png, jpg, jpeg, gif, webp</div>);
    }

    return (
        <Box bg="blue.800">
            <Text>Card name : {name} </Text>
            <HStack spacing={2}><Text>types :</Text>{typesItems}</HStack>
            <HStack spacing={2}><Text>super types :</Text>{superTypesItems}</HStack>
            <Text>Sub types : {subTypes} </Text>
            <Text>Card frame : {chosenCardFrame} </Text>
            <Text>Abilities : {spellDescription} </Text>
            <Text>Flavor text : {flavorText} </Text>
            <Text>Power : {power} </Text>
            <Text>Toughness : {toughness} </Text>
            <Text>Loyalty : {loyalty} </Text>
            <DisplayImage imageFileName={imageFileName} imageFileContent={imageFileContent}></DisplayImage>
        </Box>
    );
}
