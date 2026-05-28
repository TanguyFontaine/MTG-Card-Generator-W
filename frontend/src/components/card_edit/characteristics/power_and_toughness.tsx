import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Textbox } from "../../../style_components/textbox";
import { Text } from "../../../style_components/text";
import { FontSizeController } from "../font_size/font_size_controller";
/***************************************************************/

interface PowerToughnessProps
{
   power: string;
   toughness: string;
   setPower: (value: string) => void;
   setToughness: (value: string) => void;
   fontSize?: number;
   setFontSize?: (value: number) => void;
}

export function PowerToughness({ power, toughness, setPower, setToughness, fontSize, setFontSize }: PowerToughnessProps)
{
   return (
      <HStack w="100%" justify="space-between" flexWrap="wrap" rowGap={2}>
         <Text color="brand.textSecondary">Power:</Text>
         <Textbox flex="1" minW="80px" value={power} setValue={setPower} placeholder="Power" />
         <Text color="brand.textSecondary">Toughness:</Text>
         <Textbox flex="1" minW="80px" value={toughness} setValue={setToughness} placeholder="Toughness" />
         {fontSize !== undefined && setFontSize !== undefined &&
            <FontSizeController setValue={setFontSize} value={fontSize} />
         }
      </HStack>
   );
}
