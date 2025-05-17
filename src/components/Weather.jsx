import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

    const inputRef = useRef(); 
    const[weatherData, setWeatherData]= useState(false);
    const allIcons={
    }
    const search = async (city)=>{
        if(city ===""){
            alert("Enter City name");
            return;
        }
        try {
            const url=`http://api.weatherapi.com/v1/current.json?key=4767ecbdb01f403085d104946241211&q=${city}&aqi=yes`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            console.log(data.current.condition.icon);
            const icon=allIcons[data.current.condition.code] || clear_icon;
            setWeatherData({
                humidity: data.current.humidity,
                windSpeed: data.current.wind_kph,
                temperature: Math.floor(data.current.temp_c),
                location: data.location.name,
                icon: data.current.condition.icon,
                feels: data.current.feelslike_c,
                long: data.location.lon,
                lati: data.location.lat,
                text: data.current.condition.text,
                country : data.location.country


            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in Fetching Data");
            
        }
    }
    useEffect(()=>{
        search("Bangalore");
    },[])


  return (
    <div className="body">
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
           
        </div>
        {weatherData?<>
            <img className='iconi'src={weatherData.icon} alt="" />
            <p className='temperature'>{weatherData.temperature}°c</p>
            <p className='info'>{weatherData.text}</p>

            <p className='locationa'>Feels Like {weatherData.feels}°c</p>
            <p className='location'>{weatherData.location}</p>
            <p className='locationc'>{weatherData.country}</p>
            <p className='ll'>Longitude  {weatherData.long}</p>
            <p className='ll'>Latitude  {weatherData.lati}</p>
            
            <div className="weather-data"></div>
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div className='hw'>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div><div className="col">
                <img src={wind_icon} alt="" />
                <div className='hw'>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </>:<></>}
        
    </div>
    </div>
  )
}
export default Weather