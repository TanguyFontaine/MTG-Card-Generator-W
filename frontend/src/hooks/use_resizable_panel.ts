import { useState, useCallback, useRef } from "react";

export const MIN_PANEL_WIDTH = 400;
export const MAX_PANEL_WIDTH_RATIO = 0.75;
const DEFAULT_PANEL_WIDTH = 580;

interface ResizablePanelResult
{
   panelWidth: number;
   handleMouseDown: () => void;
}

export function useResizablePanel(): ResizablePanelResult
{
   const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
   const isResizing = useRef(false);

   const handleMouseDown = useCallback(() =>
   {
      isResizing.current = true;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      const handleMouseMove = (e: MouseEvent) =>
      {
         if (!isResizing.current) return;
         const maxWidth = window.innerWidth * MAX_PANEL_WIDTH_RATIO;
         const newWidth = Math.min(maxWidth, Math.max(MIN_PANEL_WIDTH, e.clientX));
         setPanelWidth(newWidth);
      };

      const handleMouseUp = () =>
      {
         isResizing.current = false;
         document.body.style.cursor = "";
         document.body.style.userSelect = "";
         document.removeEventListener("mousemove", handleMouseMove);
         document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
   }, []);

   return { panelWidth, handleMouseDown };
}
