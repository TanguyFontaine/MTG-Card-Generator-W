import { Box, Text } from "@chakra-ui/react";
/***************************************************************/

interface SectionBoxProps
{
   title: string;
   children: React.ReactNode;
}

export function SectionBox({ title, children }: SectionBoxProps)
{
   return (
      <Box
         w="100%"
         bg="brand.surface"
         borderRadius="6px"
         border="1px solid"
         borderColor="brand.border"
         p={4}
         _hover={{ borderColor: "brand.borderGold" }}
         transition="border-color 0.2s ease"
      >
         <Text
            fontSize="13px"
            fontWeight={700}
            textTransform="uppercase"
            letterSpacing="0.12em"
            color="brand.gold"
            mb={3}
         >
            {title}
         </Text>
         {children}
      </Box>
   );
}
