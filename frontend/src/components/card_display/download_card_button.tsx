import React from "react";
import { toPng } from "html-to-image";
/***************************************************************/

import { Button } from "../../style_components/button";
import { useCardContext } from "../../contexts/card_context";
import { dataUrlToUint8Array, injectPngDpi } from "./png_dpi_utils";

/***************************************************************/

// Output dimensions: 2x the display size (1312px wide) for a 2.5 in card = 525 DPI
// Text and fonts are re-rendered at full 2x resolution; frame PNG is upscaled 1.4x (imperceptible at card size)
const CARD_RENDER_DISPLAY_WIDTH = 656;
const DOWNLOAD_PIXEL_RATIO = 2;
const CARD_PRINT_DPI = Math.round((CARD_RENDER_DISPLAY_WIDTH * DOWNLOAD_PIXEL_RATIO) / 2.5); // 525

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
