import { extendTheme } from "@chakra-ui/react"

/***************************************************************/

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

/*********     COMPONENTS    ********/
const UiPanel = {
    baseStyle: {
        fontFamily: "EB Garamond",
        fontWeight: 500,
    },
}
const CardImagePanel = {
    baseStyle: {
        fontFamily: "Beleren Bold",
        color: "black",
    },
}
const Modal = {
    baseStyle: {
        dialog: {
            fontFamily: "EB Garamond",
            fontWeight: 500,
        },
    },
}

const components = {
    UiPanel,
    CardImagePanel,
    Modal,
}

const theme = extendTheme({ config, components })
export default theme