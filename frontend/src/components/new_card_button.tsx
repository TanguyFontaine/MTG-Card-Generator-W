/***************************************************************/
import { Button } from "../style_components/button";
import { ManaCostObj } from "../classes/mana_cost";
import { CardTypeObj } from "../classes/card_type";
import type { ImageFile } from "../classes/image_file_interface";
/***************************************************************/

interface NewCardButtonProps
{
   setCardId: (id: number | null) => void;
   setCardName: (value: string) => void;
   setSpellDescription: (value: string) => void;
   setCardType: (cardType: CardTypeObj) => void;
   setManaCost: (manaCost: ManaCostObj) => void;
   setFlavorText: (value: string) => void;
   setPower: (value: string) => void;
   setToughness: (value: string) => void;
   setCardFrame: (value: string) => void;
   setImageFile: (file: ImageFile) => void;
}

export function NewCardButton(props: NewCardButtonProps)
{
   const handleNewCard = () =>
   {
      console.log("Creating new card - resetting all data");

      // Reset card data

      props.setCardId(null);

      props.setCardName("");
      props.setSpellDescription("");
      props.setCardType(CardTypeObj.newEmpty());
      props.setManaCost(ManaCostObj.newEmpty());
      props.setFlavorText("");
      props.setPower("");
      props.setToughness("");
      props.setCardFrame("");
      props.setImageFile({localFileName: "", contentFromUrl: "", url: "", localFile: undefined});

      console.log("Card data reset complete");
   };

   return (
      <>
         <Button w={134} variant="outline" onClick={handleNewCard}>
            New Card
         </Button>
      </>
   );
}
