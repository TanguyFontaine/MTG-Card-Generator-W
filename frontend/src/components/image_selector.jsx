import React from 'react';
import { useFilePicker } from 'use-file-picker';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { Button } from "../style_components/button"
import { ImageCentering } from "./image_centering"
import { SaveImageButton } from "./save_image_button"
/***************************************************************/

export function ImageSelector(props) {

    const setImageFileFunction = props.setImageFileFunction;

    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: 'DataURL',
        limitFilesConfig: { max: 1 },
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors.length) {
        return (
            <div>
                <div>Error...</div>
                <div>{errors}</div>
            </div>
        );
    }

    filesContent.map((file) => (
        setImageFileFunction(file)
    ));

    return (
        <HStack spacing='auto'>
            <Button mr="30px" colorScheme="blue" onClick={() => openFileSelector()}>Select image file </Button>
            <SaveImageButton/>
            <ImageCentering setImageCentering={props.setImageCentering}/>
        </HStack>
    );
}
