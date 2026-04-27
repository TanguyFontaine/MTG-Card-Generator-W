import { useState } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
/***************************************************************/

interface SectionBoxProps
{
   title: string;
   children: React.ReactNode;
}

export function SectionBox({ title, children }: SectionBoxProps)
{
   const [isExpanded, setIsExpanded] = useState(true);

   return (
      // Outer card — holds the border and background
      <Box w="100%" bg="brand.surface" borderRadius="6px" border="1px solid" borderColor="brand.border"
         _hover={{ borderColor: "brand.borderGold" }} transition="border-color 0.2s ease">

         {/* Clickable header row — title on the left, chevron on the right */}
         <HStack justify="space-between" px={4} pt={4} pb={isExpanded ? 3 : 4} cursor="pointer" userSelect="none"
            onClick={() => setIsExpanded(!isExpanded)} role="button" aria-expanded={isExpanded}>

            {/* Section title */}
            <Text fontSize="13px" fontWeight={700} textTransform="uppercase" letterSpacing="0.12em" color="brand.gold">
               {title}
            </Text>

            {/* Chevron icon — rotates −90° when collapsed */}
            <Box color="brand.textSecondary" transform={isExpanded ? "rotate(0deg)" : "rotate(-90deg)"}
               transition="transform 0.25s ease, color 0.2s ease" flexShrink={0}>
               <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </Box>
         </HStack>

         {/* CSS grid trick: animates height from 0 to natural without knowing it */}
         <Box
            sx={{
               display: "grid",
               gridTemplateRows: isExpanded ? "1fr" : "0fr",
               transition: "grid-template-rows 0.25s ease",
            }}>

            {/* overflow:hidden clips the content during the collapse animation */}
            <Box overflow="hidden">
               <Box px={4} pb={4}>
                  {children}
               </Box>
            </Box>
         </Box>
      </Box>
   );
}
