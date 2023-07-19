import React from "react";

export default function Navbar(){
    let options = ['Today','Hourly','Daily','Historical Maps','3 Days']
    // ,'Today1','Hourly1','Daily1','Historical Maps1','3 Days1','Today2','Hourly2','Daily2','Historical Maps2','3 Days2'
    let buttons = options.map(element=>{
        return(<button key={options.indexOf(element)} className="nav--buttons">{element}</button>)
    })

    const scrollableDivRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startPosition, setStartPosition] = React.useState(0);

    function handleMouseDown(event){
        setIsDragging(true);
        setStartPosition(event.clientX - scrollableDivRef.current.scrollLeft);
    }

    function handleMouseUp(){
        setIsDragging(false);
    }

    function handleMouseMove(event){
        if (isDragging) {
            event.preventDefault();
            const scrollX = event.clientX - startPosition;
            scrollableDivRef.current.scrollLeft = scrollX;
        }
    }

    return(
        <div 
            className="nav--buttons-container"
            ref={scrollableDivRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {buttons}
        </div>
    )
}