import React from 'react'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { iconUrlFromCode } from '../Services/Weatherservice';
import { formatToLocalTime } from '../Services/Weatherservice';



const Temp = ({ weather: {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    sunrise,
    sunset,
    details,
    icon,
    speed,
    timezone } }) => {
    const update = () => {
        if (details === "Clear") return 'text-[#4F0E0E]'
        if (details === "Haze") return 'text-[#79DAE8]'
        else return 'text-[#BBF1FA]'
    }
    return (
        <>
            <div className={`flex items-center justify-center text-bold text-2xl ${update()} py-3`}>
                <p>{details}</p>
            </div>
            <div className="flex items-center flex-row justify-between text-white py-1">
                <img src={iconUrlFromCode(icon)} alt="" className="w-20 ml-7"></img>
                <p className="text-2xl ml-3">{temp.toFixed()}°</p>
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-center text-xs font-light">
                        <DeviceThermostatIcon className="text-white mr-1" />Real feel:
                        <span className="text-white font-medium ml-1">{feels_like.toFixed()}°</span>
                    </div>
                    <div className="flex items-center justify-center text-xs font-light">
                        <OpacityIcon className="text-white mr-1" />Humidity:
                        <span className="text-white font-medium ml-1">{humidity.toFixed()}%</span>
                    </div>
                    <div className="flex items-center justify-center text-xs font-light">
                        <AirIcon className="text-white mr-1" />Wind:
                        <span className="text-white font-medium ml-1">{speed.toFixed()} km/hr</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center space-x-2 text-white text-xs py-4">
                <WbSunnyIcon />
                <p className="font-light">Rise:<span className="font-medium ml-1">{formatToLocalTime(sunrise, timezone, "hh:mm a")} &nbsp;|&nbsp;</span></p>
                <WbTwilightIcon />
                <p className="font-light">Set:<span className="font-medium ml-1">{formatToLocalTime(sunset, timezone, "hh:mm a")} &nbsp;|&nbsp;</span></p>
                <ArrowUpwardIcon />
                <p className="font-light">High:<span className="font-medium ml-1">{temp_max.toFixed()}° &nbsp;|&nbsp;</span></p>
                <ArrowDownwardIcon />
                <p className="font-light">Low:<span className="font-medium ml-1">{temp_min.toFixed()}°</span></p>
            </div>
        </>
    )
}

export default Temp