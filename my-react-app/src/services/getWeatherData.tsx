import axios from "axios"

const getWeatherData = async (city: string, keyCode: string) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyCode}&units=metric&lang=pt`)
    return response
}   


export default getWeatherData