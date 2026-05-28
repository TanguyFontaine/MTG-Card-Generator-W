// To represent an item loaded from the DB
// It is a button that shows the card name and when clicked loads the card data into the parent component

import { Button } from "../../style_components/button";
import CardService from "../../api/services";
import { ManaCostObj } from "../../classes/mana_cost";
import { CardTypeObj } from "../../classes/card_type";
import type { Card } from "../../classes/card";
import ImageUploader from "../../classes/image_uploader";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";
import type { ImageFile } from "../../classes/image_file_interface";
import { wubrgStringToColors } from "../../classes/frame/frame_utilities";
import { FrameType } from "../../classes/frame/frame_type";
import type { LevelAbility } from "../../classes/level_ability";

const DEFAULT_LEVEL_ABILITY: LevelAbility = {
   levelMin: "", levelMax: "", spellDescription: "", spellFontSize: 98,
   power: "", toughness: "", ptFontSize: 152, levelFontSize: 150,
};

function extractLevelAbilities(specialFrameData: unknown): [LevelAbility, LevelAbility, LevelAbility]
{
   const fallback: [LevelAbility, LevelAbility, LevelAbility] =
      [DEFAULT_LEVEL_ABILITY, DEFAULT_LEVEL_ABILITY, DEFAULT_LEVEL_ABILITY];

   if (specialFrameData === null || typeof specialFrameData !== "object")
      return fallback;

   const data = specialFrameData as { levelAbilities?: unknown[] };
   if (!Array.isArray(data.levelAbilities) || data.levelAbilities.length < 3)
      return fallback;

   return data.levelAbilities.slice(0, 3).map((ab): LevelAbility =>
   {
      if (typeof ab !== "object" || ab === null)
         return DEFAULT_LEVEL_ABILITY;

      return { ...DEFAULT_LEVEL_ABILITY, ...(ab as Partial<LevelAbility>) };
   }) as [LevelAbility, LevelAbility, LevelAbility];
}

async function getImageFileFromUrl(url: string): Promise<ImageFile>
{
   let imageFile: ImageFile = { localFile: "", localFileName: "", url: "", contentFromUrl: "" };
   if (url)
   {
      const dataUrl = await ImageUploader.fetchImageContentFromUrl(url);
      imageFile = {
         url: url,
         contentFromUrl: dataUrl,
         localFile: "",
         localFileName: "",
      };
   }
   return imageFile;
}

interface LoadedCardItemProps
{
   card: Card;
   onError: (message: string) => void;
   setIsLoading: (loading: boolean) => void;
   onClose: () => void;
}

export function LoadedCardItem({ card, onError, setIsLoading, onClose }: LoadedCardItemProps)
{
   const { dispatch } = useCardContext();

   const handleSelectCard = async () =>
   {
      setIsLoading(true);

      try
      {
         const selectedCard = await CardService.getCardById(card.id);

         // Fetch image content if there's an image URL
         let imageFile: ImageFile = await getImageFileFromUrl(selectedCard.imageUrl || "");

         const frameType = (selectedCard.frameCustomization?.frameType as FrameType) ?? FrameType.Normal;
         const [levelBaseAbility, levelAbility1, levelAbility2] = extractLevelAbilities(selectedCard.specialFrameData);

         // Load the entire card state in a single dispatch
         dispatch({
            name: CardActionName.loadCard,
            data: {
               cardId: selectedCard.id,
               cardName: selectedCard.name || "",
               spellDescription: selectedCard.spellDescription || "",
               flavorText: selectedCard.flavorText || "",
               power: selectedCard.power || "",
               toughness: selectedCard.toughness || "",
               loyalty: selectedCard.loyalty || "",
               manaCost: ManaCostObj.fromString(selectedCard.manaCost),
               cardType: CardTypeObj.fromString(selectedCard.type),
               imageFile: imageFile,
               frameColorOverride: wubrgStringToColors(selectedCard.frameCustomization?.frameColorOverride ?? null),
               withVehicleFrame: selectedCard.frameCustomization?.withVehicleFrame ?? false,
               withColorIndicator: selectedCard.frameCustomization?.withColorIndicator ?? false,
               frameType,
               levelBaseAbility,
               levelAbility1,
               levelAbility2,
            },
         });

         onClose();
      }
      catch (error)
      {
         onError(`Failed to load card: ${(error as Error).message}`);
      }
      finally
      {
         setIsLoading(false);
      }
   };

   return (
      <Button
         variant="outline"
         width="100%"
         p={3}
         mb={2}
         textAlign="left"
         justifyContent="flex-start"
         onClick={handleSelectCard}
         _hover={{ bg: "brand.raised", borderColor: "brand.gold" }}
      >
         {card.name || "Unnamed Card"}
      </Button>
   );
}
