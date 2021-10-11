import React from 'react';
import { Image, Box, HStack, useStyleConfig, Flex } from "@chakra-ui/react"
import { isDefined } from '@chakra-ui/utils';
/***************************************************************/

import { Text } from "../style_components/text"
import { frames } from "../ressources/frames"
import { ManaSymbol } from "./mana_symbol"

import logo from "../ressources/logo_mini.png" 

/***************************************************************/

function fileExtensionIsValid(imageFileName) {

    const athorizedFileExtensions = ["png", "jpeg", "jpg", "gif", "webp"]

    const splitFileName = imageFileName.split('.')
    return (athorizedFileExtensions.some(ext =>(ext === splitFileName[splitFileName.length - 1].toLowerCase())));
}

function DisplayImage(props) {
    const imageFileName = props.imageFileName
    const imageFileContent = props.imageFileContent
    const imageCentering = props.imageCentering
    
    // Do not display the error panel while an image has not been selected
    if (imageFileName === "" || fileExtensionIsValid(imageFileName)) {
        return (
            <Box height="594px" width="810px" position="absolute" top="16.75%" left="54.08%">
                <Image boxSize="inherit" objectPosition={imageCentering} objectFit="cover" alt={imageFileName} src={imageFileContent}></Image>
            </Box>
        );
    }
    return (
        <Text position="absolute" top="40%" left="63%" fontSize={24} width="28%" color="white" noOfLines={2}>
            Invalid image file, supported extensions are : 
            <br />
            png, jpg, jpeg, gif, webp
        </Text>
    );
}

function retrieveCorrespondingFrameImage(frameColor, cardPower, cardToughness) {
    // to retieve the frame with the power/toughness box or the frame without
    let frameIndex = 0
    if (cardPower !== "" || cardToughness !== "") {
        frameIndex = 1
    }
    
    // By default take the colorless frame
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
    const imageCentering = props.imageCentering
    const types = props.types
    const superTypes = props.superTypes
    const subTypes = props.subTypes
    const manaCost = props.manaCost
    const colorlessManaAmount = props.colorlessManaAmount
    const spellDescription = props.spellDescription
    const flavorText = props.flavorText
    const power = props.power
    const toughness = props.toughness
    const loyalty = props.loyalty
    const selectedCardFrame = props.cardFrameColor

    const typesItems = types.map((type) => <Text>{type}</Text>);
    const superTypesItems = superTypes.map((superTypes) => <Text>{superTypes}</Text>);

    const displayableManaCost = manaCost.map((symbol) => <Box><ManaSymbol symbol={symbol} shadow={true}/></Box>);

    // Formula to display the mana cost at the right place
    // 96.8 is hard coded pos of the 1st mana symbol, 2.48 is the size of mana symbol with fontSize(35) 
    // we do not forget the colorless mana that is not the mana cost list
    const manaCostLeftPos = 96.5 - (manaCost.length + (colorlessManaAmount > 0 ? 1 : 0)) * 2.48 + "%"

    const powerLeftPos = 92.7 - ((power.length + toughness.length) / 2) + "%"

    const style = useStyleConfig("CardImagePanel")

    return (
        <Box __css={style} bg="blue.800">
            <Image mt={3} ml={3} src={retrieveCorrespondingFrameImage(selectedCardFrame, power, toughness)}/>
            <Text pos="absolute" top="8.2%" left="54.5%" fontSize={48}>{name}</Text>
            <Box name="manaCost" pos="absolute" top="8.7%" left={manaCostLeftPos} fontSize={35}>
                <HStack spacing={1}>
                    {colorlessManaAmount > 0 ? <Box><ManaSymbol symbol={colorlessManaAmount} shadow={true}/></Box> : <Box />}
                    <HStack spacing={1}> 
                        {displayableManaCost}
                    </HStack>
                </HStack>
            </Box>
            <HStack fontSize={38} pos="absolute" top="82.6%" left="54.5%" spacing={2}>
                {superTypesItems}
                {typesItems}
                <Text>{subTypes}</Text>
            </HStack>
            <Image pos="absolute" top="82.1%" left="93.5%" src={logo}/>
            <HStack fontSize={45} pos="absolute" top="129%" left={powerLeftPos} spacing={1}>
                <Text>{power} </Text>
                {power !== "" || toughness !== "" ? <Text>/</Text> : <Text/>}
                <Text>{toughness} </Text>
            </HStack>

            <DisplayImage imageFileName={imageFileName} imageFileContent={imageFileContent} imageCentering={imageCentering}></DisplayImage>
            <Box name="other information">
                <Text>Abilities : {spellDescription} </Text>
                <Text>Flavor text : {flavorText} </Text>

                <Text>Loyalty : {loyalty} </Text>
            </Box>
        </Box>
    );
}
