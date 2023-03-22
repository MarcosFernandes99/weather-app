import { useSelector } from 'react-redux'
import store from '../store'
import { setModal } from '../store/redux.modal/actions'
import getWeatherList from '../../services/getWeatherList'
import "./style.css"
import { useEffect, useState } from 'react'
import { IDataList } from '../../types/dataList.interface'
import moment from 'moment'

export const ModalDay = () => {

    const [response, setResponse] = useState<IDataList[]>([])
    const [currentDayData, setCurrentDayData] = useState<IDataList[] | null>(null)
    const keyCode = "70b0195b4333a58a709b185214fdbcac"
    const modal = useSelector((state: IStateModal) => state.modal)
    const day = useSelector((state: IStateDay) => state.day?.day)
    const city = useSelector((state: IStateCity) => state.city?.cities)

    const toggleModal = (value: string) => {
        store.dispatch(setModal(value))
    }

    useEffect(() => {
        const fetchData = async () => {
            if (city) {
                const result = await getWeatherList(city, keyCode)
                setResponse(result)
            }
        }
        fetchData()
    }, [city])

    useEffect(() => {
        if (response.length > 0 && day) {
            const matchinDays = response.filter((data) => data.data.substring(0, 10) === day)
            setCurrentDayData(matchinDays)
        } else {
            setCurrentDayData(null)
        }
    }, [response, day])

    return (
        <>
            {modal?.isOpen === "true" ? (
                <section className="modalContainer">
                    <div className="modal">
                        {currentDayData && (
                            <div className='parent'>
                                <span className="exit" onClick={() => toggleModal("false")}>❌</span>

                                <div className="tempDayContainer">
                                    <span >{moment(currentDayData[0].data).format("dddd")}</span>
                                </div>
                                <div className="alongTheDayContainer">
                                    {currentDayData.map((item) => (
                                        <div className='alongDay'>
                                            <span className='tempAlongDay'>{item.data.substring(11, 13)}h</span>
                                            <span><img className='imgTemp' src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                                alt="imageTemp" /></span>
                                            <span className='tempMaxMinAlongDay'>{item.tempMax.toFixed(0)}°</span>
                                            <span className='tempMaxMinAlongDay'>{item.tempMin.toFixed(0)}°</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            ) : null}
        </>
    );
}
