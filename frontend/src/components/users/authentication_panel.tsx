import { useState } from "react";
import { Box, VStack, HStack, FormControl, FormLabel } from "@chakra-ui/react";

/***************************************************************/

import { Button } from "../../style_components/button";
import { Input } from "../../style_components/input";
import { Text } from "../../style_components/text";
import UserService from "../../backend_connection/user_service";
import { useUserContext } from "../../contexts/user_context";

/***************************************************************/

type AuthenticationMode = "login" | "register";

export function AuthenticationPanel()
{
   const { login } = useUserContext();
   const [mode, setMode] = useState<AuthenticationMode>("login");
   const [userName, setUserName] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async () =>
   {
      setError("");
      setIsLoading(true);

      try
      {
         const user = mode === "register"
            ? await UserService.register(userName, password)
            : await UserService.login(userName, password);

         login(user);
      }
      catch (err)
      {
         setError((err as Error).message);
      }
      finally
      {
         setIsLoading(false);
      }
   };

   const handleKeyDown = (event: React.KeyboardEvent) =>
   {
      if (event.key === "Enter" && userName.trim())
      {
         handleSubmit();
      }
   };

   const toggleMode = () =>
   {
      setMode(mode === "login" ? "register" : "login");
      setError("");
   };

   return (
      <Box
         w="100%"
         h="100vh"
         display="flex"
         alignItems="center"
         justifyContent="center"
         bg="brand.base"
      >
         <Box
            w="380px"
            bg="brand.surface"
            borderRadius="8px"
            border="1px solid"
            borderColor="brand.borderGold"
            p={8}
         >
            <VStack spacing={5} align="stretch">
               <Text
                  fontSize="24px"
                  fontWeight={700}
                  color="brand.gold"
                  textAlign="center"
                  fontFamily="EB Garamond"
               >
                  {mode === "login" ? "Sign In" : "Create Account"}
               </Text>

               <FormControl>
                  <FormLabel color="brand.textSecondary" fontSize="13px" fontWeight={600} textTransform="uppercase" letterSpacing="0.1em">
                     Username
                  </FormLabel>
                  <Input
                     value={userName}
                     onChange={(e) => setUserName(e.target.value)}
                     onKeyDown={handleKeyDown}
                     placeholder="Enter your username"
                     autoFocus
                  />
               </FormControl>

               <FormControl>
                  <FormLabel color="brand.textSecondary" fontSize="13px" fontWeight={600} textTransform="uppercase" letterSpacing="0.1em">
                     Password {mode === "register" && <Text as="span" color="brand.textSecondary" fontSize="11px" textTransform="none">(optional)</Text>}
                  </FormLabel>
                  <Input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     onKeyDown={handleKeyDown}
                     placeholder={mode === "register" ? "Optional password" : "Enter your password"}
                  />
               </FormControl>

               {error && (
                  <Text color="brand.error" fontSize="14px" textAlign="center">
                     {error}
                  </Text>
               )}

               <Button
                  w="100%"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  isDisabled={!userName.trim()}
                  loadingText={mode === "login" ? "Signing in..." : "Creating account..."}
               >
                  {mode === "login" ? "Sign In" : "Create Account"}
               </Button>

               <HStack justify="center" spacing={1}>
                  <Text color="brand.textSecondary" fontSize="14px">
                     {mode === "login" ? "No account?" : "Already have an account?"}
                  </Text>
                  <Text
                     color="brand.gold"
                     fontSize="14px"
                     cursor="pointer"
                     _hover={{ color: "brand.goldHover" }}
                     onClick={toggleMode}
                  >
                     {mode === "login" ? "Register" : "Sign In"}
                  </Text>
               </HStack>
            </VStack>
         </Box>
      </Box>
   );
}
