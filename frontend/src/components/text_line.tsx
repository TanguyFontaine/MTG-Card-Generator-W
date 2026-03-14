import React from "react";
/***************************************************************/

interface TextLineProps
{
   children?: React.ReactNode;
   isEmpty?: boolean;
   style?: React.CSSProperties;
}

export function TextLine({ children, isEmpty = false, ...props }: TextLineProps)
{
   return (
      <span
         style={{
            display: "block",
            height: isEmpty ? "0.4em" : "auto",
            ...props.style,
         }}
         {...props}
      >
         {children}
      </span>
   );
}
