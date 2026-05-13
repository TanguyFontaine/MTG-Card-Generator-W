import React from "react";
import { toPng } from "html-to-image";
/***************************************************************/

import { Button } from "../../style_components/button";
import { useCardContext } from "../../contexts/card_context";
import { dataUrlToUint8Array, injectPngDpi } from "./png_dpi_utils";
import { CARD_RENDER_WIDTH } from "./card_render";

/***************************************************************/

// Output at native frame resolution (2923px wide). A standard card is 2.5 in wide → ~1169 DPI.
const DOWNLOAD_PIXEL_RATIO = 1;
const CARD_PRINT_DPI = Math.round(CARD_RENDER_WIDTH / 2.5); // 1169

/***************************************************************/

interface DownloadCardButtonProps
{
   cardRef: React.RefObject<HTMLDivElement>;
}

export function DownloadCardButton(props: DownloadCardButtonProps)
{
   const { cardRef } = props;
   const { state } = useCardContext();

   function downloadCardAsPng(): void
   {
      if (cardRef.current === null)
      {
         return;
      }
      toPng(cardRef.current, { pixelRatio: DOWNLOAD_PIXEL_RATIO })
         .then((dataUrl) =>
         {
            const pngBytes = dataUrlToUint8Array(dataUrl);
            const pngBytesWithDpi = injectPngDpi(pngBytes, CARD_PRINT_DPI);
            const blob = new Blob([new Uint8Array(pngBytesWithDpi).buffer as ArrayBuffer], { type: "image/png" });
            const objectUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.download = `${state.cardName || "card"}.png`;
            link.href = objectUrl;
            link.click();

            URL.revokeObjectURL(objectUrl);
         })
         .catch((error) =>
         {
            console.error("Failed to export card as PNG:", error);
         });
   }

   return (
      <Button size="lg" width={160} mr="30px" colorScheme="blue" onClick={downloadCardAsPng}>Download Card</Button>
   );
}
