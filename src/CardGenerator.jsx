import React, { useState } from 'react';
// 1. import `ChakraProvider` component to have chakra work correctly
import { ChakraProvider } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"

import "@fontsource/eb-garamond/400.css"
import "@fontsource/eb-garamond/500.css"
import "@fontsource/eb-garamond/600.css"
import "@fontsource/eb-garamond/700.css"
import "@fontsource/eb-garamond/800.css"
import "@saeris/typeface-beleren-bold"
import "mana-font"

/***************************************************************/

import theme from "./theme"
import { UiPanel } from "./components/ui_panel"
import { CardImagePanel } from "./components/card_image_panel"

/***************************************************************/
function CardGenerator() {

    const [imageFile, setImageFile] = useState({
        name: "",
        content: ""
    })
    const [imageCentering, setImageCentering] = useState("center") 

    const [cardName, setCardName] = useState("")

    const [types, setTypes] = useState([])

    const [superTypes, setSuperTypes] = useState([])

    const [subTypes, setSubTypes] = useState("")

    const [cardFrameColor, setCardFrame] = useState("")

    const [manaCost, setManaCost] = useState([])
    // Easier to handle colorless mana on its own. Begin at -1 to display 0 mana artifacts
    const [colorlessManaAmount, setColorlessManaAmount] = useState(-1)

    const [spellDescription, setSpellDescription] = useState("")

    const [flavorText, setFlavorText] = useState("")

    const [power, setPower] = useState("")

    const [toughness, setToughness] = useState("")

    // clean planeswalker ?
    const [loyalty, setLoyalty] = useState("")

    return (
        <ChakraProvider theme={theme} >
            <SimpleGrid columns={2} h="100vh" w="100%">
                <UiPanel setCardName={(name) => setCardName(name)} 
                         setImageFileFunction={(file) => setImageFile(file)} selectedImageFileName={imageFile.name}
                         setTypes={(types) => setTypes(types)}
                         setSuperTypes={(superTypes) => setSuperTypes(superTypes)}
                         setSubTypes={(subTypes) => setSubTypes(subTypes)}
                         setManaCost={(manaCost) => setManaCost(manaCost)} manaCost={manaCost}
                         setColorlessManaAmount={(colorlessManaAmount) => setColorlessManaAmount(colorlessManaAmount)} colorlessManaAmount={colorlessManaAmount}
                         setCardFrame={(cardFrame) => setCardFrame(cardFrame)}
                         setSpellDescription={(spellDescription) => setSpellDescription(spellDescription)} spellDescription={spellDescription}
                         setFlavorText={(flavorText) => setFlavorText(flavorText)}
                         setPower={(power) => setPower(power)}
                         setToughness={(toughness) => setToughness(toughness)}
                         setLoyalty={(loyalty) => setLoyalty(loyalty)}
                         setImageCentering={(imageCentering) => setImageCentering(imageCentering)}/>
                <CardImagePanel 
                         imageFile={imageFile} 
                         cardName={cardName} 
                         types={types} 
                         superTypes={superTypes} 
                         subTypes={subTypes}
                         manaCost={manaCost}
                         colorlessManaAmount={colorlessManaAmount}
                         cardFrameColor={cardFrameColor} 
                         spellDescription={spellDescription}
                         flavorText={flavorText}
                         power={power}
                         toughness={toughness}
                         loyalty={loyalty}
                         imageCentering={imageCentering}/>
            </SimpleGrid>
        </ChakraProvider>
    );
}

export { CardGenerator };