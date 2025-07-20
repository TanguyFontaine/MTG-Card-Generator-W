import React from 'react';
/***************************************************************/

import { Button } from "../style_components/button"
/***************************************************************/

export function DownloadCardButton(props) {

    const takeCardScreenshot = props.takeCardScreenshot

    return (
        <Button size="lg" width={160} mr="30px" colorScheme="blue" onClick={() => takeCardScreenshot()} {...props} >Download Card </Button>
    );
}
