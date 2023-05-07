import React, { useState } from 'react';
// 1. import `ChakraProvider` component to have chakra work correctly
import { ChakraProvider } from "@chakra-ui/react"
import { SimpleGrid, useControllableState } from "@chakra-ui/react"

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
    const [nameFontSize, setNameFontSize] = useControllableState({ defaultValue: 32 })

    const [types, setTypes] = useState([])
    const [superTypes, setSuperTypes] = useState([])
    const [subTypes, setSubTypes] = useState("")
    const [typesFontSize, setTypesFontSize] = useControllableState({ defaultValue: 28 })

    const [cardFrameColor, setCardFrame] = useState("")

    const [manaCost, setManaCost] = useState([])
    // Easier to handle colorless mana on its own. Begin at -1 to display 0 mana artifacts
    const [colorlessManaAmount, setColorlessManaAmount] = useState(-1)

    const [spellDescription, setSpellDescription] = useState("")
    const [spellFontSize, setSpellFontSize] = useControllableState({ defaultValue: 22 })

    const [flavorText, setFlavorText] = useState("")
    const [flavorTextFontSize, setFlavorTextFontSize] = useControllableState({ defaultValue: 21 })

    const [power, setPower] = useState("")
    const [toughness, setToughness] = useState("")
    const [ptFontSize, setPTFontSize] = useControllableState({ defaultValue: 34 })

    // clean planeswalker ?
    const [loyalty, setLoyalty] = useState("")

    return (
        <ChakraProvider theme={theme} >
            <SimpleGrid columns={2} h="100vh" w="100%">
                <UiPanel setCardName={setCardName} nameFontSize={nameFontSize} setNameFontSize={setNameFontSize}
                         setImageFileFunction={setImageFile} selectedImageFileName={imageFile.name}
                         setTypes={setTypes}
                         setSuperTypes={setSuperTypes} setTypesFontSize={setTypesFontSize} typesFontSize={typesFontSize}
                         setSubTypes={setSubTypes}
                         setManaCost={setManaCost} manaCost={manaCost}
                         setColorlessManaAmount={setColorlessManaAmount} colorlessManaAmount={colorlessManaAmount}
                         setCardFrame={setCardFrame}
                         setSpellDescription={setSpellDescription} setSpellFontSize={setSpellFontSize} spellFontSize={spellFontSize}
                         setFlavorText={setFlavorText} setFlavorTextFontSize={setFlavorTextFontSize} flavorTextFontSize={flavorTextFontSize}
                         setPower={setPower} setToughness={setToughness} setPTFontSize={setPTFontSize} ptFontSize={ptFontSize}
                         setLoyalty={setLoyalty}
                         setImageCentering={setImageCentering}/>
                <CardImagePanel 
                         imageFile={imageFile} 
                         cardName={cardName} nameFontSize={nameFontSize}
                         types={types} 
                         superTypes={superTypes} 
                         subTypes={subTypes} typesFontSize={typesFontSize}
                         manaCost={manaCost}
                         colorlessManaAmount={colorlessManaAmount}
                         cardFrameColor={cardFrameColor} 
                         spellDescription={spellDescription} spellFontSize={spellFontSize}
                         flavorText={flavorText} flavorTextFontSize={flavorTextFontSize}
                         power={power} toughness={toughness} ptFontSize={ptFontSize}
                         loyalty={loyalty}
                         imageCentering={imageCentering}/>
            </SimpleGrid>
        </ChakraProvider>
    );
}

export { CardGenerator };