import { Box, Grid, HStack, VStack, useStyleConfig } from "@chakra-ui/react";
/***************************************************************/

import { SectionBox } from "./card_edit/section_box";
import { ImageSelector } from "./card_edit/image_selector";
import { CardSavingUI } from "./users/card_saving_ui";
import { CardName } from "./card_edit/card_name";
import { TypesSelection } from "./card_edit/types_selection";
import { SuperTypesSelection } from "./card_edit/super_types_selection";
import { SubTypes } from "./card_edit/sub_types";
import { ManaCost } from "./card_edit/mana_cost";
import { CardFrameSelection } from "./card_edit/card_frame_selection";
import { SpellDescription } from "./card_edit/spell_description";
import { FlavorText } from "./card_edit/flavor_text";
import { PowerToughness } from "./card_edit/power_and_toughness";
import { Button } from "../style_components/button";
import { Text } from "../style_components/text";
import { useUserContext } from "../contexts/user_context";
/***************************************************************/

export function UiPanel()
{
   const style = useStyleConfig("UiPanel");
   const { user, logout } = useUserContext();

   return (
      <Box __css={style} w="100%">
         <VStack spacing={4} py={6} px={5} align="stretch">

            <HStack justify="space-between" px={1}>
               <Text color="brand.textSecondary" fontSize="13px">
                  Signed in as <Text as="span" color="brand.gold" fontWeight={600}>{user?.userName}</Text>
               </Text>
               <Button size="xs" variant="outline" onClick={logout}>
                  Sign Out
               </Button>
            </HStack>

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
