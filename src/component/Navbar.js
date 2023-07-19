import React from "react";

export default function Navbar(){
    let options = ['Today','Hourly','Daily','Historical Maps','3 Days','Today','Hourly','Daily','Historical Maps','3 Days','Today','Hourly','Daily','Historical Maps','3 Days']
    let buttons = options.map(element=>{
        return(<button className="nav--buttons">{element}</button>)
    })

    return(
        <div className="nav--buttons-container">
            {buttons}
        </div>
    )
}