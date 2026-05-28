import { Grid } from "@chakra-ui/react";
/***************************************************************/

import { SectionBox } from "./section_box";
import { LevelAbilityEditor } from "./characteristics/level_up/level_ability_editor";
import { BaseFrameTextEditor } from "./characteristics/basic/base_frame_text_editor";
import { useCardContext } from "../../contexts/card_context";
import { FrameType } from "../../classes/frame/frame_type";
/***************************************************************/

export function CardTextSection()
{
   const { state } = useCardContext();

   if (state.frameType === FrameType.LevelUp)
   {
      return (
         <SectionBox title="Level Abilities">
            <Grid gap="1em">
               <LevelAbilityEditor />
            </Grid>
         </SectionBox>
      );
   }

   return <BaseFrameTextEditor />;
}
