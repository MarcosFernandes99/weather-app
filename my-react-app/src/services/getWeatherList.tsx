import axios from 'axios'
import adaptWeatherData from '../shared/adapters/adaptWeatherData'
import { IWheatherData } from '../types/dataList.interface'

const getWeatherList = async (city: string, keyCode: string) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyCode}&units=metric&lang=pt`)
    const data : IWheatherData = response.data
    const adaptedResponse = adaptWeatherData(data)
    
    return adaptedResponse
}

export default getWeatherList
