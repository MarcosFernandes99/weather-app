import { IDataList, IWheatherData } from "../../types/dataList.interface"

const adaptWeatherData = (data: IWheatherData): IDataList[] => {
    const adaptedList: IDataList[] = data.list.map(item => {        
        return {
            data: item.dt_txt,
            tempDay: item.main.temp,
            tempMax: item.main.temp_max,
            tempMin: item.main.temp_min,
            icon: item.weather[0].icon,
        }
    })

    return adaptedList
}


export default adaptWeatherData