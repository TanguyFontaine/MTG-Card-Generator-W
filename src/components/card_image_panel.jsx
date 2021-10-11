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
            <Box name="cardFrame">
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
            </Box>
            <Box name="other information">
                <Text>Abilities : {spellDescription} </Text>
                <Text>Flavor text : {flavorText} </Text>

                <Text>Loyalty : {loyalty} </Text>
                <DisplayImage imageFileName={imageFileName} imageFileContent={imageFileContent}></DisplayImage>
            </Box>
        </Box>
    );
}
