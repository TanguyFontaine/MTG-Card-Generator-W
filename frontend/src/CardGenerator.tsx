import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/500.css";
import "@fontsource/eb-garamond/600.css";
import "@fontsource/eb-garamond/700.css";
import "@fontsource/eb-garamond/800.css";
import "@saeris/typeface-beleren-bold";
import "mana-font";

/***************************************************************/

import theme from "./theme";
import { UiPanel } from "./components/ui_panel";
import { CardImagePanel } from "./components/card_display/card_image_panel";
import { AuthenticationPanel } from "./components/users/authentication_panel";
import { useResizablePanel, MIN_PANEL_WIDTH, MAX_PANEL_WIDTH_RATIO } from "./hooks/use_resizable_panel";
import { CardStateProvider } from "./contexts/card_context";
import { UserStateProvider, useUserContext } from "./contexts/user_context";

/***************************************************************/
function CardGeneratorContent()
{
   const { panelWidth, handleMouseDown } = useResizablePanel();
   const { isLoggedIn } = useUserContext();

   if (!isLoggedIn)
   {
      return <AuthenticationPanel />;
   }

   return (
      <CardStateProvider>
         <Box display={{ md: "flex" }} h="100vh" w="100%" bg="brand.base">
            <Box w={`${panelWidth}px`} minW={`${MIN_PANEL_WIDTH}px`} maxW={`${MAX_PANEL_WIDTH_RATIO * 100}%`} h="100vh" overflowY="auto"
               borderRight="1px solid" borderColor="brand.border" bg="brand.base">
               <UiPanel />
            </Box>
            <Box w="6px" h="100vh" cursor="col-resize" bg="brand.border" transition="background 0.15s ease" onMouseDown={handleMouseDown} flexShrink={0} />
            <Box flex="1" h="100vh" overflowY="auto">
               <CardImagePanel />
            </Box>
         </Box>
      </CardStateProvider>
   );
}

function CardGenerator()
{
   return (
      <ChakraProvider theme={theme} >
         <UserStateProvider>
            <CardGeneratorContent />
         </UserStateProvider>
      </ChakraProvider>
   );
}

export { CardGenerator };
