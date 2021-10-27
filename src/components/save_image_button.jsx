import React, { useRef } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';
/***************************************************************/

import { Button } from "../style_components/button"
/***************************************************************/

export function SaveImageButton(props) {
      
    const cardImageRef = props.cardImageRef;
    const fileName = "card.png"
    return (
        <Button w={134} colorScheme="blue" onClick={() => exportComponentAsPNG(cardImageRef, {fileName, html2CanvasOptions: {backgroundColor: null}})}>Download card</Button>
    );
}