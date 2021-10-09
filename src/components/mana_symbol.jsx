import React from 'react';
/***************************************************************/

export function ManaSymbol(props) {
    const symbol = props.symbol || ""

    let classValue = "ms ms-" + symbol + " ms-cost "
    
    //if (props.clNumber) {
     //   classValue = classValue + "ms-" + props.clNumber + " "
    //}
    
    if (props.shadow) {
        classValue = classValue + "ms-shadow"
    }

    return (
        <i class={classValue}/>
    );
}
