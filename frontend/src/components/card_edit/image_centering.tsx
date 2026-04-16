import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Radio } from "../../style_components/radio";
import { RadioGroup } from "../../style_components/radio_group";
import { Text } from "../../style_components/text";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";
/***************************************************************/

export function ImageCentering()
{
   const { dispatch } = useCardContext();
   const setImageCentering = (value: string) => dispatch({ name: CardActionName.setImageCentering, data: value });

   return (
      <HStack spacing={2}>
         <Text color="brand.textSecondary" fontSize="14px">Crop from:</Text>
         <RadioGroup name="centering" defaultValue="center" setValue={setImageCentering}>
            <HStack spacing={3}>
               <Radio value="center" displayLabel="Center" />
               <Radio value="top" displayLabel="Top" />
               <Radio value="bottom" displayLabel="Bottom" />
               <Radio value="left" displayLabel="Left" />
               <Radio value="right" displayLabel="Right" />
            </HStack>
         </RadioGroup>
      </HStack>
   );
}
