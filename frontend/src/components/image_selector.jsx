import React, { useEffect } from 'react';
import { useFilePicker } from 'use-file-picker';
import { HStack } from "@chakra-ui/react"
/***************************************************************/

import { Button } from "../style_components/button"
import { ImageCentering } from "./image_centering"
/***************************************************************/

export function ImageSelector(props) {

    const setImageFileFunction = props.setImageFileFunction;

    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: 'DataURL',
        limitFilesConfig: { max: 1 },
    });

    // When the user picks a new file, update the parent state with useEffect.
    useEffect(() => {
        if (filesContent.length > 0) {
            setImageFileFunction(filesContent[0]);
        }
    }, [filesContent, setImageFileFunction]);

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

    return (
        <HStack spacing='auto'>
            <Button mr="30px" colorScheme="blue" onClick={() => openFileSelector()}>Select image file </Button>
            <ImageCentering setImageCentering={props.setImageCentering}/>
        </HStack>
    );
}
