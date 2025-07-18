import React from 'react';
import { Image, Box, HStack, useStyleConfig } from "@chakra-ui/react"
import { isDefined } from '@chakra-ui/utils';
/***************************************************************/

import { Text } from "../style_components/text"
import { frames } from "../ressources/frames"
import { Symbol } from "./symbol"

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
            <Box height="416px" width="566px" position="relative" top="-89.18%" left="7%" /*top="10.82%" left="62.38%"*/>
                <Image boxSize="inherit" objectPosition={imageCentering} objectFit="cover" alt={imageFileName} src={imageFileContent}></Image>
            </Box>
        );
    }
    return (
        <Text position="relative" top="-75.18%" left="10%" fontSize={24} color="white" noOfLines={2}>
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

// Take the spell descrition in param. It is a string whith the descritpion and encoded symbols
// example : [Tap] : add [g]
// returns a list of SymbolEments and Strings to be displayed
function transformIntoElements(spellDescription, spellFontSize) {
    const leftBracketSplit = spellDescription.split('[');

    let displayableElements = []
    for	(let i = 0; i < leftBracketSplit.length; i++)
    {
        const rightBracketSplit = leftBracketSplit[i].split(']')
        
        if (rightBracketSplit.length === 2) {
            // a symbol has been parsed, it is the left side of the ], the right is the rest of the description
            const symbolCode = rightBracketSplit[0]
            const displayableSymbol = (symbolCode === "e") ? 
                                      <Symbol symbolOnly={true} symbol={symbolCode} fontSize={spellFontSize - 4} style={{ position: "relative", top: "-2px" }}/> : 
                                      <Symbol symbol={symbolCode} fontSize={spellFontSize - 8} style={{ position: "relative", top: "-3px" }}/>
            displayableElements = displayableElements.concat(displayableSymbol)
            displayableElements = displayableElements.concat(rightBracketSplit[1])
        }
        else {
            displayableElements = displayableElements.concat(rightBracketSplit)
        }
    }

    return (displayableElements);
}


export function CardImagePanel(props) {

    const name = props.cardName
    const nameFontSize = props.nameFontSize
    const imageFileContent = props.imageFile.content
    const imageFileName = props.imageFile.name
    const imageCentering = props.imageCentering
    const types = props.types
    const superTypes = props.superTypes
    const subTypes = props.subTypes
    const typesFontSize = props.typesFontSize
    const manaCost = props.manaCost
    const colorlessManaAmount = props.colorlessManaAmount
    const spellDescription = props.spellDescription
    const spellFontSize = props.spellFontSize
    const flavorText = props.flavorText
    const flavorTextFontSize = props.flavorTextFontSize
    const power = props.power
    const toughness = props.toughness
    const ptFontSize  = props.ptFontSize
    const selectedCardFrame = props.cardFrameColor

    const typesItems = types.map((type) => <Text>{type}</Text>);
    const superTypesItems = superTypes.map((superTypes) => <Text>{superTypes}</Text>);

    const displayableManaCost = manaCost.map((symbol) => <Box><Symbol symbol={symbol} shadow={true}/></Box>);


    // Formulas to display values at the rigths position 
    
    //the mana cost at the right place
    // 96.8 is hard coded pos of the 1st mana symbol, 5.12 is the size of mana symbol with fontSize(24) 
    // we do not forget the colorless mana that is not the mana cost list
    const manaCostLeftPos = 93.5 - (manaCost.length + (colorlessManaAmount > -1 ? 1 : 0)) * 5.12 + "%"

    // adjust the power toughness position depending on the length of both values and the font size
    const powerLeftPos = 84.35 - ((power.length + toughness.length) / (35 / ptFontSize)) + "%"
    const powerTopPos = 89 + (3.4 - ptFontSize * 0.1) + "%"

    // adjust the name height pos depending on the font size 
    // result = baseTopValue + ((defaultFontSize / 10) - (fontSize / 10))
    const nameTopPos = 4.8 + (3.2 - nameFontSize * 0.1) + "%"
    const typesTopPos = 56.85 + (2.8 - typesFontSize * 0.1) + "%"
    const spellDescriptionLineHeight = (2 + ((spellFontSize * 0.04) - 2)) + "em"
    const flavorTextLineHeight = 1.34 + (flavorTextFontSize * 0.1 - 2.1) + "em"

    const displayableSpellDescription = transformIntoElements(spellDescription, spellFontSize)

    const style = useStyleConfig("CardImagePanel")

    return (
        <Box __css={style} h="100vh" w="100%" sx={{wordSpacing: "0.2em"}}>
            <Box position="relative" left="20%" height="937px" width="656px">
                <Image boxSize="inherit" objectFit="fit" src={retrieveCorrespondingFrameImage(selectedCardFrame, power, toughness)}/>

                <DisplayImage imageFileName={imageFileName} imageFileContent={imageFileContent} imageCentering={imageCentering}></DisplayImage>

                <Text pos="absolute" top={nameTopPos} left="7%" fontSize={nameFontSize}>{name}</Text>

                <Box name="manaCost" pos="absolute" top="5.1%" left={manaCostLeftPos} fontSize={24}>
                    <HStack spacing={1}>
                        {colorlessManaAmount > -1 ? <Box><Symbol symbol={colorlessManaAmount} shadow={true}/></Box> : <Box />}
                        <HStack spacing={1}> 
                            {displayableManaCost}
                        </HStack>
                    </HStack>
                </Box>

                <HStack fontSize={typesFontSize} pos="absolute" top={typesTopPos} left="7%" spacing="0.3em">
                    {superTypesItems}
                    {typesItems}
                    <Text>{subTypes}</Text> 
                </HStack>
                <Image boxSize="44px" pos="absolute" top="56.2%" left="87%" src={logo}/>
                
                <Box fontSize={spellFontSize} lineHeight={spellDescriptionLineHeight} sx={{wordSpacing: "0.12em"}}>
                    <Text whiteSpace="pre-wrap" fontFamily="EB Garamond" fontWeight={500} pos="absolute" top="64.5%" left="8.5%" width="84%" >{displayableSpellDescription}</Text>
                </Box>   

                <HStack fontSize={ptFontSize} pos="absolute" top={powerTopPos} left={powerLeftPos} spacing={1}>
                    <Text>{power} </Text>
                    {power !== "" || toughness !== "" ? <Text>/</Text> : <Text/>}
                    <Text>{toughness} </Text>
                </HStack>

                <Box lineHeight={flavorTextLineHeight} sx={{wordSpacing: "0.12em"}}>
                    <Text as="i" fontSize={flavorTextFontSize} whiteSpace="pre-wrap" fontFamily="EB Garamond" fontWeight={500} pos="absolute" top="76%" left="8.5%" width="82%" >{flavorText}</Text>
                </Box>
            </Box>
        </Box>
    );
}
