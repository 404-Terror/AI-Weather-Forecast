import React from 'react'
import { iconUrlFromCode } from '../Services/Weatherservice'

const Forecast = ({ title, list }) => {
    return (
        <>
            <div className="flex items-center justify-start my-2">
                <p className="text-white font-medium text-sm">{title} FORECAST -</p>
            </div>
            <hr className="my-1"></hr>
            <div className="flex flex-row items-center justify-between text-white my-5">
                {list.map(item => (
                    <div className="flex flex-col items-center justify-center hover:scale-110">
                        <p className="font-light text-xs">{item.title}</p>
                        <img src={iconUrlFromCode(item.icon)} alt="" className="w-10"></img>
                        <p className="font-medium text-sm">{item.temp.toFixed()}°</p>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Forecast