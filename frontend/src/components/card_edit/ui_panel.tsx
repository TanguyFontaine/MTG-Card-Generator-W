import { Box, Grid, HStack, VStack, useStyleConfig } from "@chakra-ui/react";
/***************************************************************/

import { SectionBox } from "./section_box";
import { ImageSelector } from "./image/image_selector";
import { CardSavingUI } from "../users/card_saving_ui";
import { CardName } from "./characteristics/card_name";
import { TypesSelection } from "./characteristics/types_selection";
import { SuperTypesSelection } from "./characteristics/super_types_selection";
import { SubTypes } from "./characteristics/sub_types";
import { ManaCost } from "./characteristics/mana_cost";
import { FrameCustomization } from "./characteristics/frame_customization";
import { CardTextSection } from "./card_text_section";
import { Button } from "../../style_components/button";
import { Text } from "../../style_components/text";
import { useUserContext } from "../../contexts/user_context";
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
               </Grid>
            </SectionBox>

            <SectionBox title="Card Type">
               <Grid gap="1em">
                  <TypesSelection />
                  <SuperTypesSelection />
                  <SubTypes />
               </Grid>
            </SectionBox>

            <SectionBox title="Frame Customization">
               <Grid gap="1em">
                  <FrameCustomization />
               </Grid>
            </SectionBox>

            {/* spell description, flavor text, power/toughness or other depending on frame type */}
            <CardTextSection />

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
