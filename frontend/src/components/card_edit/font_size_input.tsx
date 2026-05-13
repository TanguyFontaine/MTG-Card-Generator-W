import { useState } from "react";
/***************************************************************/

import { Input } from "../../style_components/input";
/***************************************************************/

interface FontSizeInputProps
{
   value: number;
   setValue: (value: number) => void;
}

export function FontSizeInput(props: FontSizeInputProps)
{
   const [inputText, setInputText] = useState<string | null>(null);

   const commitInput = () =>
   {
      if (inputText !== null)
      {
         const parsed = parseInt(inputText, 10);
         if (!isNaN(parsed))
         {
            props.setValue(parsed);
         }
         setInputText(null);
      }
   };

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
   {
      if (event.key === "Enter")
      {
         commitInput();
         (event.target as HTMLInputElement).blur();
      }
      else if (event.key === "Escape")
      {
         setInputText(null);
         (event.target as HTMLInputElement).blur();
      }
   };

   return (
      <Input
         value={inputText !== null ? inputText : String(props.value)}
         onChange={(event) => setInputText(event.target.value)}
         onBlur={commitInput}
         onKeyDown={handleKeyDown}
         onFocus={(event) => { setInputText(String(props.value)); event.target.select(); }}
         size="xs" mx={1} fontSize="13px" color="brand.textSecondary" width="36px"
         textAlign="center" variant="unstyled" p={0}
      />
   );
}
