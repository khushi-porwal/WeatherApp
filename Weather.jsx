import { useState, useEffect } from 'react';

const Weather = () => {
    const [city, setCity] = useState('');
    const [api, setApi] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const WeatherData = async () => {
        const API = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=a84fab07772a2643610b836095d7f26b`;
        try {
            const res = await fetch(API);
            const data = await res.json();
            setApi(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        WeatherData();
    }, []);

    if (error) {
        return <h1>{error.message}</h1>;
    }

    if (loading) {
        return <h1>Loading....</h1>;
    }

    return (
        <>
            <div
                className='h-screen w-full bg-cover bg-center flex items-center justify-center'
                style={{
                    backgroundImage:
                        "url('https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg?cs=srgb&dl=pexels-simon73-1183099.jpg&fm=jpg')",
                }}
            >
                <div className='bg-blue-300 bg-opacity-80 h-80 w-100 max-w-xl rounded-xl shadow-lg text-white p-6'>
                    <h1 className='text-center font-bold text-2xl mb-5'>Live Weather Finder App</h1>
                    <div className='flex justify-center items-center mb-6'>
                        <label htmlFor="data" className='text-lg font-bold mr-3'>City:</label>
                        <input
                            id="data"
                            placeholder="Enter City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='rounded-lg w-40 h-10 p-2 text-black bg-white'
                        />
                        <button
                            onClick={WeatherData}
                            className="bg-white ml-3 text-black w-20 h-10 font-bold rounded-lg"
                        >
                            Search
                        </button>
                    </div>
                    <div className='text-center'>
                        <p>Temperature: {api?.main?.temp}°C</p>
                        <p>Description: {api?.weather?.[0]?.description}</p>
                        <p>Wind Speed: {api?.wind?.speed} m/s</p>
                        <p>Humidity: {api?.main?.humidity}%</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Weather;
