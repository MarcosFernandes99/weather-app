import { useState } from 'react'
import "./style.css"
import { setModal } from '../../Components/store/redux.modal/actions'
import store from '../../Components/store'
import { ModalDay } from '../../Components/modal'
import getWeatherData from "../../services/getWeatherData"
import { setCityState } from '../../Components/store/redux.city/actions'
import { setDayState } from '../../Components/store/redux.day/actions'
import moment from 'moment'

export const Home = () => {

    const [city, setCity] = useState<string>('')
    const [dataApi, setDataApi] = useState<IWeather>({})

    const keyCode = "70b0195b4333a58a709b185214fdbcac"

    const toggleModal = (value: string) => {
        store.dispatch(setModal(value))
    }

    const searchCity = async () => {
        store.dispatch(setCityState(city))
        const response = await getWeatherData(city, keyCode)
        const filterData = filterWeatherData(response.data)
        setDataApi(filterData)
    }

    const filterWeatherData = (data: any) : IWeather => {
        const filterData = data.list.reduce((result: IWeather, item: any) => {
            const date = item.dt_txt.split(' ')[0];
            if (!result[date]) {
                result[date] = {
                    data: date,
                    temp_max: item.main.temp_max,
                    temp_min: item.main.temp_min,
                    description: item.weather[0].icon,
                };
            } else{
                if(item.main.temp_max > result[date].temp_max){
                    result[date].temp_max = item.main.temp_max
                }

                if(item.main.temp_min < result[date].temp_min){
                    result[date].temp_min = item.main.temp_min
                }
            } 
            return result;
        }, {});

        return filterData;
    };

    const setDay = (date: string) => {
        store.dispatch(setDayState(date))
    }

    return (
        <>
            <section className='container'>
                <h1 className="title">Previsão do tempo</h1>

                <div className='search'>
                    <input onChange={(e) => setCity(String(e.target.value))} className='city-input' type="text" placeholder='Digite o nome da cidade' />
                    <button className='btnSearch' onClick={searchCity}>🔎</button>
                </div>

                <h3 className='week'>Próxima semana:</h3>
                
                <div className="containerDays">
                    {Object.keys(dataApi).map((key) => {
                        const { data, description, temp_max, temp_min } = dataApi[key];
                        return (
                            <div onClick={() => toggleModal("true")} className='days' key={data}>
                                <span onClick={() => setDay(data)} className='day'>{data.split('-').reverse().join('/')}</span>
                                <span className='day tempMax'>⬆ {temp_max.toFixed(0)}°</span>
                                <span className='day tempMin'>⬇ {temp_min.toFixed(0)}° </span>
                                <span className='day'><img className='imageTemp' src={`https://openweathermap.org/img/wn/${description}@2x.png`}
                                    alt="imageTemp" /></span>
                            </div>
                        );
                    })}
                </div>

            </section>
            <ModalDay />
        </>
    )
}
