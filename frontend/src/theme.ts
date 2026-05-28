import { extendTheme } from "@chakra-ui/react";

/***************************************************************/

const config = {
   initialColorMode: "dark",
   useSystemColorMode: false,
};

/*********     COLORS    ********/
const colors = {
   brand: {
      base: "#0c0e14",
      surface: "#141824",
      raised: "#1c2236",
      gold: "#c9a55a",
      goldHover: "#dbb96c",
      goldDim: "#7a6530",
      textPrimary: "#e0d8cc",
      textSecondary: "#8a8070",
      border: "#2a2a3a",
      borderGold: "rgba(201, 165, 90, 0.25)",
      inputBg: "#0f1320",
      error: "#cc4444",
      success: "#44aa66",
   },
};

/*********     GLOBAL STYLES    ********/
const styles = {
   global: {
      body: {
         bg: "brand.base",
         color: "brand.textPrimary",
      },
   },
};

/*********     COMPONENTS    ********/
const UiPanel = {
   baseStyle: {
      fontFamily: "EB Garamond",
      fontWeight: 500,
   },
};

const CardImagePanel = {
   baseStyle: {
      fontFamily: "Beleren Bold",
      color: "black",
   },
};

const Modal = {
   baseStyle: {
      dialog: {
         fontFamily: "EB Garamond",
         fontWeight: 500,
         bg: "brand.raised",
         color: "brand.textPrimary",
         border: "1px solid",
         borderColor: "brand.borderGold",
      },
      header: {
         color: "brand.gold",
         fontWeight: 600,
      },
      overlay: {
         bg: "rgba(0, 0, 0, 0.7)",
         backdropFilter: "blur(4px)",
      },
      closeButton: {
         color: "brand.textSecondary",
         _hover: { color: "brand.gold" },
      },
   },
};

const Button = {
   baseStyle: {
      fontFamily: "EB Garamond",
      fontWeight: 600,
      borderRadius: "4px",
      transition: "all 0.2s ease",
   },
   variants: {
      solid: {
         bg: "brand.gold",
         color: "brand.base",
         _hover: {
            bg: "brand.goldHover",
            transform: "translateY(-1px)",
            boxShadow: "0 2px 8px rgba(201, 165, 90, 0.3)",
         },
         _active: {
            bg: "brand.goldDim",
            transform: "translateY(0)",
         },
      },
      outline: {
         borderColor: "brand.borderGold",
         color: "brand.textPrimary",
         _hover: {
            bg: "brand.raised",
            borderColor: "brand.gold",
         },
      },
      ghost: {
         color: "brand.textSecondary",
         _hover: {
            color: "brand.gold",
            bg: "brand.raised",
         },
      },
      danger: {
         bg: "#8a1e1e",
         color: "white",
         _hover: {
            bg: "#aa1e1e",
            transform: "translateY(-1px)",
            boxShadow: "0 2px 8px rgba(204, 68, 68, 0.35)",
         },
         _active: {
            bg: "#8a1e1e",
            transform: "translateY(0)",
         },
      },
      dangerGhost: {
         color:  "rgba(247, 53, 53, 0.88)",
         borderColor: "rgba(204, 68, 68, 0.5)",
         borderWidth: "1px",
         bg: "transparent",
         _hover: {
            bg: "rgba(146, 35, 78, 0.13)",
            borderColor: "rgba(247, 53, 53, 0.88)",
         },
      },
   },
   defaultProps: {
      variant: "solid",
   },
};

const Input = {
   variants: {
      outline: {
         field: {
            bg: "brand.inputBg",
            borderColor: "brand.border",
            color: "brand.textPrimary",
            fontFamily: "EB Garamond",
            _hover: {
               borderColor: "brand.goldDim",
            },
            _focus: {
               borderColor: "brand.gold",
               boxShadow: "0 0 0 1px rgba(201, 165, 90, 0.4)",
            },
            _placeholder: {
               color: "brand.textSecondary",
               opacity: 0.6,
            },
         },
      },
   },
};

const Textarea = {
   variants: {
      outline: {
         bg: "brand.inputBg",
         borderColor: "brand.border",
         color: "brand.textPrimary",
         fontFamily: "EB Garamond",
         _hover: {
            borderColor: "brand.goldDim",
         },
         _focus: {
            borderColor: "brand.gold",
            boxShadow: "0 0 0 1px rgba(201, 165, 90, 0.4)",
         },
         _placeholder: {
            color: "brand.textSecondary",
            opacity: 0.6,
         },
      },
   },
};

const Select = {
   variants: {
      outline: {
         field: {
            bg: "brand.inputBg",
            borderColor: "brand.border",
            color: "brand.textPrimary",
            fontFamily: "EB Garamond",
            _hover: {
               borderColor: "brand.goldDim",
            },
            _focus: {
               borderColor: "brand.gold",
               boxShadow: "0 0 0 1px rgba(201, 165, 90, 0.4)",
            },
         },
         icon: {
            color: "brand.textSecondary",
         },
      },
   },
};

const Checkbox = {
   baseStyle: {
      control: {
         borderColor: "brand.border",
         _checked: {
            bg: "brand.gold",
            borderColor: "brand.gold",
            color: "brand.base",
            _hover: {
               bg: "brand.goldHover",
               borderColor: "brand.goldHover",
            },
         },
         _hover: {
            borderColor: "brand.goldDim",
         },
      },
      label: {
         fontFamily: "EB Garamond",
         color: "brand.textPrimary",
      },
   },
};

const Radio = {
   baseStyle: {
      control: {
         borderColor: "brand.border",
         _checked: {
            bg: "brand.gold",
            borderColor: "brand.gold",
            color: "brand.base",
            _hover: {
               bg: "brand.goldHover",
               borderColor: "brand.goldHover",
            },
         },
         _hover: {
            borderColor: "brand.goldDim",
         },
      },
      label: {
         fontFamily: "EB Garamond",
         color: "brand.textPrimary",
      },
   },
};

const Accordion = {
   baseStyle: {
      container: {
         borderColor: "brand.border",
      },
      button: {
         fontFamily: "EB Garamond",
         color: "brand.textSecondary",
         fontSize: "14px",
         _hover: {
            bg: "brand.raised",
            color: "brand.gold",
         },
      },
      panel: {
         bg: "brand.surface",
         borderRadius: "0 0 4px 4px",
      },
   },
};

const FormLabel = {
   baseStyle: {
      fontFamily: "EB Garamond",
      color: "brand.textPrimary",
      fontWeight: 500,
   },
};

const components = {
   UiPanel,
   CardImagePanel,
   Modal,
   Button,
   Input,
   Textarea,
   Select,
   Checkbox,
   Radio,
   Accordion,
   FormLabel,
};

const theme = extendTheme({ config, colors, styles, components });
export default theme;
