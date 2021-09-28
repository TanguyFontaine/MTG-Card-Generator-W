import React, { useState } from 'react';
// 1. import `ChakraProvider` component to have chakra work correctly
import { ChakraProvider } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"

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

    const [cardName, setCardName] = useState("")

    const [types, setTypes] = useState([])

    const [superTypes, setSuperTypes] = useState([])

    const [subTypes, setSubTypes] = useState("")


    return (
        <ChakraProvider theme={theme} >
            <SimpleGrid columns={2} h="100vh" w="100%">
                <UiPanel cardName={cardName} setCardName={(name) => setCardName(name)} 
                         setImageFileFunction={(file) => setImageFile(file)} selectedImageFileName={imageFile.name}
                         types={types} setTypes={(types) => setTypes(types)}
                         superTypes={superTypes} setSuperTypes={(superTypes) => setSuperTypes(superTypes)}
                         subTypes={subTypes} setSubTypes={(subTypes) => setSubTypes(subTypes)}/>
                <CardImagePanel imageFile={imageFile} cardName={cardName} types={types} superTypes={superTypes} subTypes={subTypes}/>
            </SimpleGrid>
        </ChakraProvider>
    );
}

export { CardGenerator };