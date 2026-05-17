import { useState } from "react";
import { VStack, HStack } from "@chakra-ui/react";
/***************************************************************/

import { Radio } from "../../style_components/radio";
import { Checkbox } from "../../style_components/checkbox";
import { Text } from "../../style_components/text";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";
import { CardColor } from "../../classes/card_color";

/***************************************************************/

const COLOR_OPTIONS: { color: CardColor; label: string }[] = [
   { color: CardColor.White, label: "White" },
   { color: CardColor.Blue,  label: "Blue"  },
   { color: CardColor.Black, label: "Black" },
   { color: CardColor.Red,   label: "Red"   },
   { color: CardColor.Green, label: "Green" },
];

export function FrameCustomization()
{
   const { state, dispatch } = useCardContext();
   const [withColorIndicator, setWithColorIndicator] = useState(false);

   const effectiveColors: CardColor[] = state.frameColorOverride ?? [];
   const isColorless = state.frameColorOverride !== null && state.frameColorOverride.length === 0;

   function toggleColor(color: CardColor): void
   {
      const current = state.frameColorOverride ?? [];
      const newColors = current.includes(color)
         ? current.filter(c => c !== color)
         : [...current, color];
      // If all colors were removed, revert to auto (null) instead of forcing colorless
      dispatch({ name: CardActionName.setFrameColorOverride, data: newColors.length > 0 ? newColors : null });
   }

   function toggleColorless(): void
   {
      if (isColorless)
      {
         // Unticking colorless = revert to auto
         dispatch({ name: CardActionName.setFrameColorOverride, data: null });
      }
      else
      {
         dispatch({ name: CardActionName.setFrameColorOverride, data: [] });
      }
   }

   return (
      <VStack spacing={4} align="stretch">

         <HStack spacing={2} align="stretch">
            <Text color="brand.textSecondary">Vehicle frame:</Text>
            <Radio
               isChecked={state.usesVehicleFrame}
               onClick={() =>
                  dispatch({ name: CardActionName.setUsesVehicleFrame, data: !state.usesVehicleFrame })
               }
            />
         </HStack>

         <VStack spacing={2} align="stretch">
            <HStack spacing={2} align="stretch">
               <Text color="brand.textSecondary">Frame colors:</Text>
               <Radio displayLabel="With color indicator" isChecked={withColorIndicator} onClick={() => setWithColorIndicator(!withColorIndicator)} />
            </HStack>
            <VStack spacing={1} align="flex-start">
               <Checkbox
                  displayLabel="Colorless"
                  isChecked={isColorless}
                  onChange={toggleColorless}
               />
               {COLOR_OPTIONS.map(({ color, label }) => (
                  <Checkbox
                     key={color}
                     displayLabel={label}
                     isChecked={effectiveColors.includes(color)}
                     onChange={() => toggleColor(color)}
                  />
               ))}
            </VStack>
         </VStack>

      </VStack>
   );
}

