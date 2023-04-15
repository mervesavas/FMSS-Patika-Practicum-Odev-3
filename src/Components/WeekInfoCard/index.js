import React, {useState} from 'react'
import {UseWeatherAppContext} from "../../Context/Context";
import CardComponents from "../Card";

const WeekInfoCardComponents=()=> {
    const {state:{daily},dispatch}=UseWeatherAppContext();
    const [selectedCard,setSelectedCard]=useState(0)

    return (
        <div className="cardWrap">
            <ul className="cardList">
                {
                    daily && daily.length > 0 ? daily.map((item,index)=> { // `daily dizisinin mevcut olup olmadığını ve en az bir öğeye sahip olup olmadığını kontrol eder.
                        
                        if (index < 5){
                        return(
                        <CardComponents className={index === selectedCard ? "active" : ""} onClick={()=>{
                            setSelectedCard(index)
                        }} item={item} key={index} />
                    )
                    }
                    return '';
                }) : ''
                }

            </ul>

        </div>
    )
}

export default WeekInfoCardComponents;
