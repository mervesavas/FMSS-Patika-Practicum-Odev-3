import React, { useEffect } from "react";
import cities from "../../Data/iller.json";
import { UseWeatherAppContext } from "../../Context/Context";
import axios from "axios";
import dayjs from "dayjs";

const ChooseStateComponents = () => {
    const { state: { city }, dispatch } = UseWeatherAppContext();

    const handleChange = (e) => {
        const selectedCity = cities.filter((city) => {
            return city.name === e.target.value;
        })[0];
        dispatch({
            type: "SET_CITY",
            payload: selectedCity,
        });
    };

    //api bilgileri
    const key = "29fc04065469346f226a149b0e081ded";
    let lat = city && city.latitude ? city.latitude : "";
    let long = city && city.longitude ? city.longitude : "";
    //şehrin enlem ve boylam bilgisini kontrol eder.

    // Varsayılan olarak gelen şehrin enlem ve boylam bilgileri.
    if (!lat || !long) {
        lat= 41.0053;
        long = 28.9770;
    }

    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=tr&cnt=40`;

    const fetchData = () => {
        axios(URL).then((data) => {  // yukarıdaki URyi kullanarak hava tahmini verilerini getiren bir axios isteği yapılır.

            const daily = {};
            let maxTemp=null;
            let minTemp=null;
            //maxTemp ve minTemp değişkenleri, her bir gün için en yüksek ve en düşük sıcaklığı tutar. 
            let day = dayjs() //bugünü tutan day nesnesi
            let i = 1;
            data.data.list.forEach((weatherData) => {
                const weatherDay = dayjs(weatherData.dt*1000) //"weatherDay" değişkeni, "weatherData" değişkenindeki "dt" özelliğinden tarih bilgisi elde ederek dayjs nesnesine dönüştürür.
                    if(maxTemp<weatherData.main.temp_max || maxTemp === null){
                        maxTemp=weatherData.main.temp_max;
                    }
                    if(minTemp>weatherData.main.temp_min || minTemp === null){
                        minTemp=weatherData.main.temp_min;
                    }  
                    //her bir hava tahmini öğesi için en yüksek ve en düşük sıcaklıkların güncellenmesi sağlanır. 

                    if(weatherDay.format('HH')==='00'){  //00da günü diğer güne çeviriyor.
                        day=dayjs().add(i,'day');
                        i++;} 
                    if(weatherDay.format('HH')==='21'){
                        daily[day.unix()] = {...weatherData, maxTemp: maxTemp, minTemp: minTemp};
                        maxTemp=null
                        minTemp=null
                    } //günlük hava tahmini verilerini oluşturmak için kullanılan daily nesnesine yeni bir öğe ekler.
                    //maxTemp ve minTemp değişkenleri sıfırlanır, böylece bir sonraki günün sıcaklık değerlerini doğru bir şekilde hesaplayabiliriz.
                }             
              );
            dispatch({
                type: "SET_DAILY",
                payload: Object.values(daily),
            });  //API'dan alınan günlük hava durumu verilerinin, state içindeki "daily" adlı değişkene aktarılması sağlanır. 
        });
    };

    useEffect(() => {
        fetchData();
    }, [city]); //city stateinde değişiklik olduğunda (şehir değiştiğinde) fetchData fonksiyonunu çalıştırır. 

    return (
        <>
            <div className="stateWrap">
                <select
                    className="stateMenu"
                    defaultValue={"İstanbul"}
                    onChange={handleChange}  //şehir değişikliği yapıldığında handleChange fonksiyonu çağrılır.
                > 
                    {cities &&
                        cities.length > 0 &&
                        cities.map((city) => { //şehirleri map döngüsü ile geziyoruz. 
                            return (
                                <option
                                    key={`${city.population}${city.latitude}`}
                                    value={city.name}  
                                >
                                    {city.name} 
                                </option>
                            );
                        })}
                </select>
            </div>
        </>
    );
};

export default ChooseStateComponents;