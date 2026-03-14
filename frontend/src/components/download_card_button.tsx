/***************************************************************/
import { Button } from "../style_components/button";
/***************************************************************/

interface DownloadCardButtonProps
{
   takeCardScreenshot: () => void;
}

export function DownloadCardButton(props: DownloadCardButtonProps)
{
   const takeCardScreenshot = props.takeCardScreenshot;

   return (
      <Button size="lg" width={160} mr="30px" colorScheme="blue" onClick={() => takeCardScreenshot()}>Download Card </Button>
   );
}
