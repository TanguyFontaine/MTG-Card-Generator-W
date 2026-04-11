import { createContext, useContext, useReducer } from "react";
/***************************************************************/

import { CardState, INITIAL_STATE } from "./card_state";
import { CardAction, CardActionName } from "./card_actions";
/***************************************************************/

// This file defines the CardContext,
// which holds the entire state of the card in the UI (frontend)
// with update functions (dispatch) to modify that state.
// The context allows any component in the tree to access and update the card state
// without needing to pass props down through multiple levels of components (prop drilling).,

// ─── Reducer ─────────────────────────────────────────────────
// Components will call dispatch with specific actions, and the reducer will update the state accordingly.
function cardReducer(state: CardState, action: CardAction): CardState
{
   switch (action.name)
   {
      case CardActionName.setCardId:
         return { ...state, cardId: action.data };
      case CardActionName.setCardName:
         return { ...state, cardName: action.data };
      case CardActionName.setNameFontSize:
         return { ...state, nameFontSize: action.data };
      case CardActionName.setImageFile:
         return { ...state, imageFile: action.data };
      case CardActionName.setImageCentering:
         return { ...state, imageCentering: action.data };
      case CardActionName.setCardType:
         return { ...state, cardType: action.data };
      case CardActionName.setTypesFontSize:
         return { ...state, typesFontSize: action.data };
      case CardActionName.setCardFrame:
         return { ...state, cardFrame: action.data };
      case CardActionName.setManaCost:
         return { ...state, manaCost: action.data };
      case CardActionName.setSpellDescription:
         return { ...state, spellDescription: action.data };
      case CardActionName.setSpellFontSize:
         return { ...state, spellFontSize: action.data };
      case CardActionName.setFlavorText:
         return { ...state, flavorText: action.data };
      case CardActionName.setFlavorTextFontSize:
         return { ...state, flavorTextFontSize: action.data };
      case CardActionName.setPower:
         return { ...state, power: action.data };
      case CardActionName.setToughness:
         return { ...state, toughness: action.data };
      case CardActionName.setPowerToughnessFontSize:
         return { ...state, powerToughnessFontSize: action.data };
      case CardActionName.setLoyalty:
         return { ...state, loyalty: action.data };
      case CardActionName.resetCard:
         return { ...INITIAL_STATE };
      case CardActionName.loadCard:
         return { ...state, ...action.data };
      default:
         return state;
   }
}

// ─── Context ─────────────────────────────────────────────────

interface CardContextValue
{
   state: CardState;
   dispatch: React.Dispatch<CardAction>;
   // The dispatch function updates the card state based on the action provided.
}

const CardContext = createContext<CardContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────

interface CardStateProviderProps
{
   children: React.ReactNode;
}

// The CardStateProvider component wraps the part of the app that needs access to the card state
export function CardStateProvider({ children }: CardStateProviderProps)
{
   const [state, dispatch] = useReducer(cardReducer, INITIAL_STATE);

   return (
      <CardContext.Provider value={{ state, dispatch }}>
         {children}
      </CardContext.Provider>
   );
}

// ─── Hook ────────────────────────────────────────────────────

// Access card state and dispatch from any descendant component of CardStateProvider.
export function useCardContext(): CardContextValue
{
   const context = useContext(CardContext);
   if (!context)
   {
      throw new Error("useCardContext must be used within a CardStateProvider");
   }
   return context;
}
