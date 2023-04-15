import React, {useReducer, useContext, useEffect} from 'react'
import {WeatherReducer} from "./Reducer";

const WeatherAppContext = React.createContext();
const WeatherAppProvider = ({children}) => {
    const [state, dispatch] = useReducer(WeatherReducer, {
        city: '',
        current: '',
        daily: ''
    })
    return (
        <div>
            <WeatherAppContext.Provider value={{state,dispatch}}>
                {children}
            </WeatherAppContext.Provider>

        </div>
    )
}

export default WeatherAppProvider;
export const UseWeatherAppContext=()=>{
    const { state, dispatch } = useContext(WeatherAppContext);

  useEffect(() => {
  }, [state.daily]);

  return { state, dispatch };
};