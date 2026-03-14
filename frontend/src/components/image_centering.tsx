import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Radio } from "../style_components/radio";
import { RadioGroup } from "../style_components/radio_group";
import { Text } from "../style_components/text";
/***************************************************************/

interface ImageCenteringProps
{
   setImageCentering: (value: string) => void;
}

export function ImageCentering(props: ImageCenteringProps)
{
   return (
      <HStack spacing={2}>
         <Text>Crop image from :</Text>
         <RadioGroup name="centering" defaultValue="center" setValue={(value) => props.setImageCentering(value)}>
            <HStack spacing={4}>
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
