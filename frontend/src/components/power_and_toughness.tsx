import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Textbox } from "../style_components/textbox";
import { Text } from "../style_components/text";
import { FontSizeController } from "./font_size_controller";
/***************************************************************/

interface PowerToughnessProps
{
   power: string;
   toughness: string;
   ptFontSize: number;
   setPower: (value: string) => void;
   setToughness: (value: string) => void;
   setPTFontSize: (value: number) => void;
}

export function PowerToughness(props: PowerToughnessProps)
{
   return (
      <HStack w="100%" justify="space-between" flexWrap="wrap" rowGap={2}>
         <Text color="brand.textSecondary">Power:</Text>
         <Textbox flex="1" minW="80px" value={props.power} setValue={(value) => props.setPower(value)} placeholder="Power" />
         <Text color="brand.textSecondary">Toughness:</Text>
         <Textbox flex="1" minW="80px" value={props.toughness} setValue={(value) => props.setToughness(value)} placeholder="Toughness" />
         <FontSizeController setValue={props.setPTFontSize} value={props.ptFontSize} />
      </HStack>
   );
}
