import React from 'react';
import { Image, Box, HStack, Heading, useStyleConfig } from "@chakra-ui/react"
/***************************************************************/

import { Text } from "../style_components/text"
import { frames } from "../ressources/frames"
import { isDefined } from '@chakra-ui/utils';

/***************************************************************/

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

function retrieveCorrespondingFrameImage(frameColor, cardPower, cardToughness) {
    // to retieve the frame with the power/toughness box or the frame without
    let frameIndex = 0
    if (cardPower !== "" || cardToughness !== "") {
        frameIndex = 1
    }
    
    // By default take the =olorless frame
    let frameImage = frames["Colorless"][frameIndex]

    if (isDefined(frameColor) && frameColor !== "") {
        frameImage = frames[frameColor][frameIndex]
    }

    return frameImage
}

export function CardImagePanel(props) {

    const name = props.cardName
    const imageFileContent = props.imageFile.content
    const imageFileName = props.imageFile.name
    const types = props.types
    const superTypes = props.superTypes
    const subTypes = props.subTypes
    const spellDescription = props.spellDescription
    const flavorText = props.flavorText
    const power = props.power
    const toughness = props.toughness
    const loyalty = props.loyalty
    const selectedCardFrame = props.cardFrameColor

    const typesItems = types.map((type) => <Text>{type}</Text>);
    const superTypesItems = superTypes.map((superTypes) => <Text>{superTypes}</Text>);

    const style = useStyleConfig("CardImagePanel")

    return (
        <Box __css={style} bg="blue.800">
            <Box name="cardFrame">
                <Image mt={3} ml={3} src={retrieveCorrespondingFrameImage(selectedCardFrame, power, toughness)}/>
                <Text pos="absolute" top="8.7%" left="54.5%" fontSize={38}>{name}</Text>
            </Box>
            <Box name="other information">
            <Text>Card name : {name} </Text>
            <HStack spacing={2}><Text>types :</Text>{typesItems}</HStack>
            <HStack spacing={2}><Text>super types :</Text>{superTypesItems}</HStack>
            <Text>Sub types : {subTypes} </Text>
            <Text>Card frame : {selectedCardFrame} </Text>
            <Text>Abilities : {spellDescription} </Text>
            <Text>Flavor text : {flavorText} </Text>
            <Text>Power : {power} </Text>
            <Text>Toughness : {toughness} </Text>
            <Text>Loyalty : {loyalty} </Text>
            <DisplayImage imageFileName={imageFileName} imageFileContent={imageFileContent}></DisplayImage>
            </Box>
        </Box>
    );
}
