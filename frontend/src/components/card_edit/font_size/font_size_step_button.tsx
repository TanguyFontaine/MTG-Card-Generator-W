import { useRef, useCallback } from "react";
/***************************************************************/

import { Button } from "../../../style_components/button";
/***************************************************************/

/* How long the user must hold before repeating starts, and the repeat interval. */
const HOLD_DELAY_MS = 400;
const HOLD_INTERVAL_MS = 80;

/**
 * A button that fires `onStep` once on click, and repeatedly while held down,
 * after an initial delay.
 */
interface FontSizeStepButtonProps
{
   onStep: () => void;
   children: React.ReactNode;
}

export function FontSizeStepButton(props: FontSizeStepButtonProps)
{
   const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
   const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

   /* Ref so the interval always calls the latest onStep, even after re-renders. */
   const onStepRef = useRef(props.onStep);
   onStepRef.current = props.onStep;

   /* Cancels any pending timeout and active interval. */
   const stopHold = useCallback(() =>
   {
      if (holdTimeoutRef.current !== null)
      {
         clearTimeout(holdTimeoutRef.current);
         holdTimeoutRef.current = null;
      }
      if (holdIntervalRef.current !== null)
      {
         clearInterval(holdIntervalRef.current);
         holdIntervalRef.current = null;
      }
   }, []);

   /* Waits HOLD_DELAY_MS, then fires onStep every HOLD_INTERVAL_MS. */
   const startHold = useCallback(() =>
   {
      holdTimeoutRef.current = setTimeout(() =>
      {
         holdIntervalRef.current = setInterval(() =>
         {
            onStepRef.current();
         }, HOLD_INTERVAL_MS);
      }, HOLD_DELAY_MS);
   }, []);

   return (
      <Button size="xs" variant="ghost" minW="28px"
         onClick={props.onStep}
         onMouseDown={startHold}
         onMouseUp={stopHold}
         onMouseLeave={stopHold}
      >
         {props.children}
      </Button>
   );
}
