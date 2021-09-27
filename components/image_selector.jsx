import React from 'react';
import { useFilePicker } from 'use-file-picker';
import { Box, Stack, HStack, VStack } from "@chakra-ui/react"
/***************************************************************/

import { Button } from "../style_compomemts/button"


/***************************************************************/
export function ImageSelector(props) {

    const setImageFileFunction = props.setImageFileFunction;
    const selectedImageFileName = props.selectedImageFileName;

    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: 'DataURL',
        // multiple: true,
        limitFilesConfig: { max: 1 },
        // minFileSize: 0.1, // in megabytes
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
        <HStack spacing={4}>
            <Button colorScheme="blue" onClick={() => openFileSelector()}>Select image file </Button>
            <Box p={2}>{selectedImageFileName}</Box>
        </HStack>
    );
}
