import React from 'react';
import { Image, Box, HStack, useStyleConfig, Flex } from "@chakra-ui/react"
import { isDefined } from '@chakra-ui/utils';
/***************************************************************/

import { Text } from "../style_components/text"
import { frames } from "../ressources/frames"
import { ManaSymbol } from "./mana_symbol"

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
    const manaCostLeftPos = 96.8 - (manaCost.length + (colorlessManaAmount > 0 ? 1 : 0)) * 2.48 + "%"

    const style = useStyleConfig("CardImagePanel")

    return (
        <Box __css={style} bg="blue.800">
            <Box name="cardFrame">
                <Image mt={3} ml={3} src={retrieveCorrespondingFrameImage(selectedCardFrame, power, toughness)}/>
                <Text pos="absolute" top="8.7%" left="54.5%" fontSize={38}>{name}</Text>
            </Box>
            <Box name="other information">
                <Text>Card name : {name} </Text>
                <HStack spacing={2}>
                    <Text>types :</Text>
                    {typesItems}
                </HStack>
                <HStack spacing={2}>
                    <Text>super types :</Text>
                    {superTypesItems}
                </HStack>
                <Text>Sub types : {subTypes} </Text>
                <Box name="manaCost" pos="absolute" top="8.5%" left={manaCostLeftPos} fontSize={35}>
                    <HStack spacing={1}>
                        {colorlessManaAmount > 0 ? <Box><ManaSymbol symbol={colorlessManaAmount} shadow={true}/></Box> : <Box />}
                        <HStack spacing={1}> 
                            {displayableManaCost}
                        </HStack>
                    </HStack>
                </Box>
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
