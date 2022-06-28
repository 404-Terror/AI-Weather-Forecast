import React from 'react'
import { formatToLocalTime } from '../Services/Weatherservice'

const TandLoc = ({ weather: { dt, timezone, name, country } }) => {
    return (
        <div className="flex flex-col items-center justify-center my-2">
            <p className="text-white text-sm font-extralight my-2">{formatToLocalTime(dt, timezone)}</p>
            <p className="text-white text-xl font-medium">{`${name},${country}`}</p>
        </div>
    )
}

export default TandLoc