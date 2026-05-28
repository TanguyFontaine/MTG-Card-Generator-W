import { HStack } from "@chakra-ui/react";
/***************************************************************/
import { Textbox } from "../../../../style_components/textbox";
import { Text } from "../../../../style_components/text";
import { FontSizeController } from "../../font_size/font_size_controller";
/***************************************************************/

interface LevelRangeProps
{
   levelMin: string;
   setLevelMin: (value: string) => void;
   levelMax: string;
   setLevelMax: (value: string) => void;
   fontSize: number;
   setFontSize: (value: number) => void;
}

const toDigitsOnly = (value: string): string => value.replace(/\D/g, "");

export function LevelRange({ levelMin, setLevelMin, levelMax, setLevelMax, fontSize, setFontSize }: LevelRangeProps)
{
   return (
      <HStack w="100%" spacing={2} flexWrap="wrap" rowGap={2}>
         <Text color="brand.textSecondary" minW="85px">Level range:</Text>
         <Textbox
            flex="1"
            minW="80px"
            value={levelMin}
            setValue={(value) => setLevelMin(toDigitsOnly(value))}
            placeholder="Min"
         />
         <Text color="brand.textSecondary">-</Text>
         <Textbox
            flex="1"
            minW="80px"
            value={levelMax}
            setValue={(value) => setLevelMax(toDigitsOnly(value))}
            placeholder="Max (empty = +)"
         />
         <FontSizeController value={fontSize} setValue={setFontSize} />
      </HStack>
   );
}
