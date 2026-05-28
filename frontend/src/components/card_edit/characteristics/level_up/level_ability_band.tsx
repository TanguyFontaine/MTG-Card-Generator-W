import { VStack } from "@chakra-ui/react";
/***************************************************************/
import { Text } from "../../../../style_components/text";
import { SpellDescription } from "../spell_description";
import { PowerToughness } from "../power_and_toughness";
import { LevelAbility } from "../../../../classes/level_ability";
import { LevelRange } from "./level_range";
/***************************************************************/

interface LevelAbilityBandProps
{
   label: string;
   ability: LevelAbility;
   setAbility: (ability: LevelAbility) => void;
   isBaseAbilities?: boolean;
}

const toDigitsOnly = (value: string): string => value.replace(/\D/g, "");

export function LevelAbilityBand({ label, ability, setAbility, isBaseAbilities }: LevelAbilityBandProps)
{
   return (
      <VStack spacing={3} align="stretch">
         <Text color="brand.textPrimary" fontWeight={600} fontSize="sm">{label}</Text>

         { !isBaseAbilities && (
         <LevelRange
            levelMin={ability.levelMin}
            setLevelMin={(value) => setAbility({ ...ability, levelMin: value })}
            levelMax={ability.levelMax}
            setLevelMax={(value) => setAbility({ ...ability, levelMax: value })}
            fontSize={ability.levelFontSize}
            setFontSize={(value) => setAbility({ ...ability, levelFontSize: value })}
         />
         )}

         <SpellDescription
            value={ability.spellDescription}
            setValue={(value) => setAbility({ ...ability, spellDescription: value })}
            fontSize={ability.spellFontSize}
            setFontSize={(value) => setAbility({ ...ability, spellFontSize: value })}
         />

         <PowerToughness
            power={ability.power}
            toughness={ability.toughness}
            setPower={(value) => setAbility({ ...ability, power: value })}
            setToughness={(value) => setAbility({ ...ability, toughness: value })}
            fontSize={ability.ptFontSize}
            setFontSize={(value) => setAbility({ ...ability, ptFontSize: value })}
         />
      </VStack>
   );
}
