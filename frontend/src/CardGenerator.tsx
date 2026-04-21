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
         <Box display={{ base: "block", md: "flex" }} minH="100vh" w="100%" bg="brand.base">
            <Box
               w={{ base: "100%", md: `${panelWidth}px` }}
               minW={{ base: "unset", md: `${MIN_PANEL_WIDTH}px` }}
               maxW={{ base: "100%", md: `${MAX_PANEL_WIDTH_RATIO * 100}%` }}
               h={{ base: "auto", md: "100vh" }}
               overflowY={{ base: "visible", md: "auto" }}
               borderRight={{ base: "none", md: "1px solid" }}
               borderBottom={{ base: "1px solid", md: "none" }}
               borderColor="brand.border"
               bg="brand.base"
            >
               <UiPanel />
            </Box>
            <Box
               display={{ base: "none", md: "block" }}
               w="6px"
               h="100vh"
               cursor="col-resize"
               bg="brand.border"
               transition="background 0.15s ease"
               onMouseDown={handleMouseDown}
               flexShrink={0}
            />
            <Box flex="1" h={{ base: "auto", md: "100vh" }} overflowY={{ base: "visible", md: "auto" }}>
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
