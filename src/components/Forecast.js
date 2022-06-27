import React from 'react'
import { iconUrlFromCode } from '../Services/Weatherservice'

const Forecast = ({ title, list }) => {
    return (
        <>
            <div className="flex items-center justify-start my-3">
                <p className="text-white font-medium text-xl">{title} FORECAST -</p>
            </div>
            <hr className="my-3"></hr>
            <div className="flex flex-row items-center justify-between text-white my-4">
                {list.map(item => (
                    <div className="flex flex-col items-center justify-center hover:scale-110">
                        <p className="font-light text-sm">{item.title}</p>
                        <img src={iconUrlFromCode(item.icon)} alt="" className="w-12 my-1"></img>
                        <p className="font-medium">{item.temp.toFixed()}°</p>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Forecast