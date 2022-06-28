import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Inputs = ({ setQuery, setUnits, units }) => {

    const [city, setCity] = useState("");
    const handleclick = () => {
        if (city !== '') {
            setQuery({ q: city });
            setCity("");
        }
    };
    const handleunits = (e) => {
        const currentunit = e.currentTarget.name;
        if (units !== currentunit) setUnits(currentunit);
    }


    const handlelocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setQuery({
                    lat,
                    lon,
                });
            });
        }
    };

    const handlepress = (e) => {
        if (e.key === "Enter") {
            if (city !== '') {
                setQuery({ q: city });
                setCity("");
            }
        }
    }
    return (
        <div className="flex flex-row justify-center my-4">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-3">
                <SearchIcon className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleclick} />
                <LocationOnIcon className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handlelocation} />
                <input
                    type="text"
                    value={city}
                    className="text-sm font-normal p-2 w-full shadow-xl focus:outline-none rounded"
                    placeholder=" Search for city..."
                    onChange={(e) => setCity(e.currentTarget.value)}
                    onKeyPress={(e) => handlepress(e)}>
                </input>
            </div>
            <div className="flex flex-row w-1/4 items-center justify-center">
                <button name="metric" className="text-white cursor-pointer font-normal text-sm hover:scale-125" onClick={handleunits}>°C</button>
                <p className="text-white font-sm mx-1 p-0">|</p>
                <button name="imperial" className="text-white cursor-pointer font-normal text-sm hover:scale-125" onClick={handleunits}>°F</button>
            </div>
        </div>
    )
}

export default Inputs