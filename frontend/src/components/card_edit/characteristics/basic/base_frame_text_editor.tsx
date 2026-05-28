import { Grid } from "@chakra-ui/react";
/***************************************************************/

import { SectionBox } from "../../section_box";
import { SpellDescription } from "../spell_description";
import { FlavorText } from "../flavor_text";
import { PowerToughness } from "../power_and_toughness";
import { useCardContext } from "../../../../contexts/card_context";
import { CardActionName } from "../../../../contexts/card_actions";
/***************************************************************/

export function BaseFrameTextEditor()
{
   const { state, dispatch } = useCardContext();

   return (
      <SectionBox title="Card Text">
         <Grid gap="1em">
            <SpellDescription
               value={state.spellDescription}
               setValue={(value) => dispatch({ name: CardActionName.setSpellDescription, data: value })}
               fontSize={state.spellFontSize}
               setFontSize={(value) => dispatch({ name: CardActionName.setSpellFontSize, data: value })}
            />

            <FlavorText />

            <PowerToughness
               power={state.power}
               toughness={state.toughness}
               setPower={(value) => dispatch({ name: CardActionName.setPower, data: value })}
               setToughness={(value) => dispatch({ name: CardActionName.setToughness, data: value })}
               fontSize={state.powerToughnessFontSize}
               setFontSize={(value) => dispatch({ name: CardActionName.setPowerToughnessFontSize, data: value })}
            />
         </Grid>
      </SectionBox>
   );
}
