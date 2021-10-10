import React from 'react';
/***************************************************************/

export function ManaSymbol(props) {
    const symbol = props.symbol || ""

    let classValue = "ms ms-" + symbol

    if (!props.symbolOnly) {
        classValue = classValue + " ms-cost "
    }
    
    if (props.shadow) {
        classValue = classValue + "ms-shadow"
    }

    return (
        <i class={classValue}/>
    );
}
