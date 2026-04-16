import { useCallback, useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import { HStack } from "@chakra-ui/react";
/***************************************************************/

import { Button } from "../../style_components/button";
import { Text } from "../../style_components/text";
import { ImageCentering } from "./image_centering";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";
/***************************************************************/

export function ImageSelector()
{
   const { state, dispatch } = useCardContext();

   const setImageFile = useCallback(
      (file: { localFileName: string; localFile: string; url?: string; contentFromUrl: string }) =>
         dispatch({ name: CardActionName.setImageFile, data: file }),
      [dispatch],
   );

   const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
      readAs: "DataURL",
      limitFilesConfig: { max: 1 },
   });

   // When the user picks a new file, update the parent state with useEffect.
   useEffect(() => {
      if (filesContent.length > 0)
      {
         const fileContent = filesContent[0];
         setImageFile({
            localFileName: fileContent.name,
            localFile: fileContent.content,
            url: undefined,
            contentFromUrl: ""
         });
      }
   }, [filesContent, setImageFile]);

   if (loading)
   {
      return <div>Loading...</div>;
   }

   if (errors.length)
   {
      return (
         <div>
            <div>Error...</div>
            <div>{errors.map((e, i) => <div key={i}>{e.name}</div>)}</div>
         </div>
      );
   }

   return (
      <HStack w="100%" justify="space-between" flexWrap="wrap" rowGap={3}>
         <Button colorScheme="blue" variant="outline" onClick={() => openFileSelector()}>Select image file</Button>
         {state.imageFile.localFileName &&
            <Text fontSize="13px" color="brand.textSecondary" wordBreak="break-all">{state.imageFile.localFileName}</Text>
         }
         <ImageCentering />
      </HStack>
   );
}
