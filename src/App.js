import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Inputs from './components/Inputs'
import TandLoc from './components/TandLoc'
import Temp from './components/Temp'
import Forecast from './components/Forecast'
import getFormattedWeatherData from "./Services/Weatherservice";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import alanBtn from '@alan-ai/alan-sdk-web';



const App = () => {
    const [query, setQuery] = useState({ q: "Kolkata" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        var alanBtnInstance = alanBtn({
            key: '52ee84c6f7d4c5543c1aa7e4ce21d7372e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, article }) => {
                if (command === 'show') {
                    setQuery({ q: article });
                }
            },
            onButtonState: async function (status) {
                if (status === 'ONLINE') {
                    if (!this.greetingWasSaid) {
                        await alanBtnInstance.activate();
                        alanBtnInstance.playText("Hello! I'm Alan. I am your voice assistant.");
                        alanBtnInstance.playText("To search for weather of any location just press the microphone button and say: Show me weather of.....then the city name");
                        this.greetingWasSaid = true
                    }
                }
            },
        });
    }, []);


    useEffect(() => {
        const fetchWeather = async () => {
            const message = query.q ? query.q : "current location.";
            await getFormattedWeatherData({ ...query, units }).then((data) => {
                setWeather(data);
                toast.success("Successfully fetched weather for " + message, { theme: "dark" });
            });
        };
        fetchWeather();
    }, [query, units]);

    const updatebackground = () => {
        if (!weather) return 'from-cyan-700 to-blue-700'
        const det = weather.details;
        if (det === 'Clouds') return 'from-[#205375] to-[#413F42]'
        if (det === 'Clear') return 'from-yellow-500 to-orange-700'
        if (det === 'Haze') return 'from-[#316B83] to-[#748DA6]'
        if (det === 'Rain') return 'from-[#332FD0] to-[#0E185F]'
        if (det === 'Thunderstorm') return 'from-[#413F42] to-[#7F8487]'
        if (det === 'Snow') return 'from-[#9D84B7] to-[#93B5C6]'
    }

    return (
        <div className={`mx-auto max-w-screen-sm mt-2 py-5 px-20 bg-gradient-to-br ${updatebackground()} h-fit shadow-[-20px_20px_30px_0px_rgba(0,0,0,1)]`}>
            <Header setQuery={setQuery} />
            <Inputs setQuery={setQuery} setUnits={setUnits} units={units} />
            {weather && (
                <>
                    <TandLoc weather={weather} />
                    <Temp weather={weather} />
                    <Forecast title="HOURLY" list={weather.hourly} />
                    <Forecast title="DAILY" list={weather.daily} />
                </>
            )}
            <ToastContainer
                position="top-right"
                theme="colored"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                style={{ width: '400px' }}
            />
        </div>
    )
}

export default App