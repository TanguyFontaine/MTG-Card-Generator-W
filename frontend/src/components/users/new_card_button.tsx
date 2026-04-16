/***************************************************************/
import { Button } from "../../style_components/button";
import { useCardContext } from "../../contexts/card_context";
import { CardActionName } from "../../contexts/card_actions";
/***************************************************************/

export function NewCardButton()
{
   const { dispatch } = useCardContext();

   const handleNewCard = () =>
   {
      dispatch({ name: CardActionName.resetCard });
   };

   return (
      <>
         <Button w={134} variant="outline" onClick={handleNewCard}>
            New Card
         </Button>
      </>
   );
}
