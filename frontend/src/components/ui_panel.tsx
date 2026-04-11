import { Box, Grid, VStack, useStyleConfig } from "@chakra-ui/react";
/***************************************************************/

import { SectionBox } from "./section_box";
import { ImageSelector } from "./image_selector";
import { CardSavingUI } from "./card_saving_ui";
import { CardName } from "./card_name";
import { TypesSelection } from "./types_selection";
import { SuperTypesSelection } from "./super_types_selection";
import { SubTypes } from "./sub_types";
import { ManaCost } from "./mana_cost";
import { CardFrameSelection } from "./card_frame_selection";
import { SpellDescription } from "./spell_description";
import { FlavorText } from "./flavor_text";
import { PowerToughness } from "./power_and_toughness";
/***************************************************************/

export function UiPanel()
{
   const style = useStyleConfig("UiPanel");

   return (
      <Box __css={style} w="100%">
         <VStack spacing={4} py={6} px={5} align="stretch">
            <SectionBox title="Card Identity">
               <Grid gap="1em">
                  <CardName />
                  <ManaCost />
                  <CardFrameSelection />
               </Grid>
            </SectionBox>

            <SectionBox title="Card Type">
               <Grid gap="1em">
                  <TypesSelection />
                  <SuperTypesSelection />
                  <SubTypes />
               </Grid>
            </SectionBox>

            <SectionBox title="Card Text">
               <Grid gap="1em">
                  <SpellDescription />
                  <FlavorText />
                  <PowerToughness />
              </Grid>
            </SectionBox>

            <SectionBox title="Card Image">
               <ImageSelector />
            </SectionBox>

            <Box w="100%" pt={2} pb={2}>
               <CardSavingUI />
            </Box>
         </VStack>
      </Box>
   );
}
