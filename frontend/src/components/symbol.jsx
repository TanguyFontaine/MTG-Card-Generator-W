import React from 'react';
/***************************************************************/

export function Symbol({ fontSize, symbolOnly, symbol, shadow, style, ...otherProps }) {
    let classValue = "ms ms-" + symbol

    if (!symbolOnly) {
        classValue = classValue + " ms-cost"
    }
    
    if (shadow) {
        classValue = classValue + " ms-shadow"
    }

    return (
        <i style={{ fontSize: fontSize, ...style }} className={classValue} />
    );
}
