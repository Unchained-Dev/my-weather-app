import React, { useContext } from "react";
import './nav.css'
import {SettingsContext} from '../../contexts/settings_context'


export default function Navbar(){
    const scrollableDivRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startPosition, setStartPosition] = React.useState(0);

    const { theme } = useContext(SettingsContext)

    let options = ['Today','Hourly','Daily','Historical Maps','3 Days']
    // ,'Today1','Hourly1','Daily1','Historical Maps1','3 Days1','Today2','Hourly2','Daily2','Historical Maps2','3 Days2'
    let buttons = options.map(element=>{
        return(<button key={options.indexOf(element)} className={"nav--buttons " + theme}>{element}</button>)
    })


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
        <ul
            className={"nav--buttons-container " + theme}
            ref={scrollableDivRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {buttons}
        </ul>
    )
}