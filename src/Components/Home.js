import React from 'react';
import ChooseStateComponents from "./ChooseState";
import WeekInfoCardComponnets from "./WeekInfoCard";
const HomeComponents=()=>{
    return(
        <>
        <div className="homeWrap">
                    <ChooseStateComponents/>
                    <WeekInfoCardComponnets/>
        </div>
        </>
    )

}
export default HomeComponents;