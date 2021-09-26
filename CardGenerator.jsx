import React, { useState } from 'react';
// 1. import `ChakraProvider` component to have chakra work correctly
import { ChakraProvider } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"

/***************************************************************/

import { UiPanel } from "./components/ui_panel"
import { CardImagePanel } from "./components/card_image_panel"

/***************************************************************/
function CardGenerator() {

    const [imageFile, setImageFile] = useState({
        name: "",
        content: ""
    });

    const [cardName, setCardName] = useState("")

    return (
        <ChakraProvider>
            <SimpleGrid columns={2} h="100vh" w="100%">
                <UiPanel cardName={cardName} setCardName={(name) => setCardName(name)} setImageFileFunction={(file) => setImageFile(file)} selectedImageFileName={imageFile.name}/>
                <CardImagePanel imageFile={imageFile} cardName={cardName}/>
            </SimpleGrid>
        </ChakraProvider>
    );
}

export { CardGenerator };