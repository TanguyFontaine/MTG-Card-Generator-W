import { VStack, Divider } from "@chakra-ui/react";
/***************************************************************/
import { useCardContext } from "../../../../contexts/card_context";
import { CardActionName } from "../../../../contexts/card_actions";
import { LevelAbilityBand } from "./level_ability_band";
/***************************************************************/

export function LevelAbilityEditor()
{
   const { state, dispatch } = useCardContext();

   return (
      <VStack spacing={4} align="stretch">
         <LevelAbilityBand
            label="Base characteristics"
            ability={state.levelBaseAbility}
            setAbility={(ability) => dispatch({ name: CardActionName.setLevelBaseAbility, data: ability })}
            isBaseAbilities={true}
         />

         <Divider />

         <LevelAbilityBand
            label="Level range 1"
            ability={state.levelAbility1}
            setAbility={(ability) => dispatch({ name: CardActionName.setLevelAbility1, data: ability })}
            isBaseAbilities={false}
         />

         <Divider />

         <LevelAbilityBand
            label="Level range 2"
            ability={state.levelAbility2}
            setAbility={(ability) => dispatch({ name: CardActionName.setLevelAbility2, data: ability })}
            isBaseAbilities={false}
         />
      </VStack>
   );
}
