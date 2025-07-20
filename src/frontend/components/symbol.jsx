import React from 'react';
/***************************************************************/

export function Symbol({ fontSize, ...props }) {
    let classValue = "ms ms-" + props.symbol

    if (!props.symbolOnly) {
        classValue = classValue + " ms-cost"
    }
    
    if (props.shadow) {
        classValue = classValue + " ms-shadow"
    }

    return (
        <i style={{ fontSize: fontSize, ...props.style }} class={classValue} />
    );
}
