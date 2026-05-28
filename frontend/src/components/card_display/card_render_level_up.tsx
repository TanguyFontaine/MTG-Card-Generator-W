import { Box, HStack } from "@chakra-ui/react";
/***************************************************************/

import { Text } from "../../style_components/text";
import { CARD_UI_Z_INDEX } from "../../classes/frame/frame_layers";
import { CardState } from "../../contexts/card_state";
import { transformIntoDisplayableElements } from "./card_render_utilities";

/***************************************************************/
const LEVEL_BASE_ABILITY_TOP    = "66%";
const LEVEL_1_ABILITY_TEXT_TOP  = "76%";
const LEVEL_2_ABILITY_TEXT_TOP  = "86%";
const LEVEL_BASE_ABILITY_LEFT   = "7.25%";
const LEVEL_ABILITY_LEFT        = "20%";
const LEVEL_BASE_ABILITY_WIDTH  = "71%";
const LEVEL_ABILITY_WIDTH       = "58%";

const LEVEL_BASE_PT_BASELINE   = 67.4;
const LEVEL_1_PT_BASELINE      = 77.85;
const LEVEL_2_PT_BASELINE      = 88.25;

const LEVEL_TEXT_FONT_SIZE     = 72;
const LEVEL_TEXT_LEFT          = "5.6%";
const LEVEL_1_TEXT_TOP         = "77%";
const LEVEL_2_TEXT_TOP         = "87.5%";

const LEVEL_1_RANGE_TOP        = 78.4;
const LEVEL_2_RANGE_TOP        = 88.6;
const LEVEL_RANGE_LEFT         = "5.75%";

// Converts separate min/max inputs to the display string shown on the arrow.
// levelMax empty → "LEVEL X+", otherwise → "LEVEL X-Y".
function formatLevelRange(levelMin: string, levelMax: string): string
{
   if (!levelMin)
      return "";
   if (!levelMax)
      return `${levelMin}+`;
   return `${levelMin}-${levelMax}`;
}

/***************************************************************/

export interface LevelUpCardTextProps
{
   cardState: CardState;
}

export function LevelUpCardText({ cardState }: LevelUpCardTextProps)
{
   const {
      levelBaseAbility,
      levelAbility1,
      levelAbility2,
      withVehicleFrame,
   } = cardState;

   const ptColor = withVehicleFrame ? "white" : undefined;

   function abilityText(description: string, top: string, left: string, width: string, fontSize: number)
   {
      const lineHeight = (fontSize * 0.0075) + "em";
      return (
         <Box fontSize={fontSize} lineHeight={lineHeight} sx={{ wordSpacing: "0.08em" }}>
            <Text whiteSpace="pre-wrap" fontFamily="EB Garamond" fontWeight={500}
               pos="absolute" zIndex={CARD_UI_Z_INDEX} top={top} left={left} width={width}>
               {transformIntoDisplayableElements(description, fontSize)}
            </Text>
         </Box>
      );
   }

   function ptText(power: string, toughness: string, topBaseline: number, fontSize: number)
   {
      // adjust the power toughness position depending on the length of both values and the font size
      const baseLeftPos = power.charAt(0) === "1" ? 86.2 : 85.5; // Small adjustment for 1 power based, since 1 takes less space than other digits
      const left = baseLeftPos - (((power.length + toughness.length) * 1.3) / (160 / fontSize)) + "%";
      const top = topBaseline + (3.36 - fontSize * 0.022) + "%";

      return (
         <HStack fontSize={fontSize} pos="absolute" zIndex={CARD_UI_Z_INDEX}
            top={top} left={left} spacing={1} color={ptColor}>
            <Text>{power} </Text>
            {power !== "" || toughness !== "" ? <Text>/</Text> : <Text />}
            <Text>{toughness} </Text>
         </HStack>
      );
   }

   const level1RangeTop = LEVEL_1_RANGE_TOP * (100 - (levelAbility1.levelFontSize - 150) * 0.02) / 100;
   const level2RangeTop = LEVEL_2_RANGE_TOP * (100 - (levelAbility2.levelFontSize - 150) * 0.02) / 100;

   return (
      <>
         {/* Base band — spell description + P/T */}
         {abilityText(levelBaseAbility.spellDescription, LEVEL_BASE_ABILITY_TOP, LEVEL_BASE_ABILITY_LEFT, LEVEL_BASE_ABILITY_WIDTH, levelBaseAbility.spellFontSize)}
         {ptText(levelBaseAbility.power, levelBaseAbility.toughness, LEVEL_BASE_PT_BASELINE, levelBaseAbility.ptFontSize)}

         {/* Level band 1 — range label on arrow + ability text + P/T */}
         <Text fontFamily="EB Garamond" fontWeight={700} fontSize={LEVEL_TEXT_FONT_SIZE}
            pos="absolute" zIndex={CARD_UI_Z_INDEX} top={LEVEL_1_TEXT_TOP} left={LEVEL_TEXT_LEFT}>LEVEL</Text>
         <Text fontFamily="EB Garamond" fontWeight={700} fontSize={levelAbility1.levelFontSize}
            pos="absolute" zIndex={CARD_UI_Z_INDEX} top={level1RangeTop + "%"} left={LEVEL_RANGE_LEFT}>
            {formatLevelRange(levelAbility1.levelMin, levelAbility1.levelMax)}
         </Text>
         {ptText(levelAbility1.power, levelAbility1.toughness, LEVEL_1_PT_BASELINE, levelAbility1.ptFontSize)}
         {abilityText(levelAbility1.spellDescription, LEVEL_1_ABILITY_TEXT_TOP, LEVEL_ABILITY_LEFT, LEVEL_ABILITY_WIDTH, levelAbility1.spellFontSize)}

         {/* Level band 2 — range label on arrow + ability text + P/T */}
         <Text fontFamily="EB Garamond" fontWeight={700} fontSize={LEVEL_TEXT_FONT_SIZE}
            pos="absolute" zIndex={CARD_UI_Z_INDEX} top={LEVEL_2_TEXT_TOP} left={LEVEL_TEXT_LEFT}>LEVEL</Text>
         <Text fontFamily="EB Garamond" fontWeight={700} fontSize={levelAbility2.levelFontSize}
            pos="absolute" zIndex={CARD_UI_Z_INDEX} top={level2RangeTop + "%"} left={LEVEL_RANGE_LEFT}>
            {formatLevelRange(levelAbility2.levelMin, levelAbility2.levelMax)}
         </Text>
         {ptText(levelAbility2.power, levelAbility2.toughness, LEVEL_2_PT_BASELINE, levelAbility2.ptFontSize)}
         {abilityText(levelAbility2.spellDescription, LEVEL_2_ABILITY_TEXT_TOP, LEVEL_ABILITY_LEFT, LEVEL_ABILITY_WIDTH, levelAbility2.spellFontSize)}
      </>
   );
}
