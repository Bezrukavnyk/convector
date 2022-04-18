import { useEffect, useState } from 'react';

import UnstyledInputBasic from '../Input/Input';
import UnstyledSelectSimple from '../../components/Select/Select'

import { getCurrencyApi } from '../../api/getCurrencyApi';


const Currency = () => {

    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState(null);
    const [valueFirst, setValueFirst] = useState("");
    const [valueSecond, setValueSecond] = useState("");
    const [currencyNameFirst, setCurrencyNameFirst] = useState("UA");
    const [currencyNameSecond, setcurrencyNameSecond] = useState("USD");
    const [activeInput, setActiveInput] = useState("first");

    // обрабатываем ответ api
    const getResponsData = (data) => {
        setLoading(true)
        if(Array.isArray(data) && data.length > 1){
            setCurrency(data)
            setLoading(false)
        }
    }
    
    // запрос на api
    useEffect(() => {
         getCurrencyApi()
            .then(data => getResponsData(data))
    }, [])


    // фун-я для обработки конвертации 
    const changeValueCurrency = (currencyNameFirstVariable,
                                currencyNameSecondVariable,
                                valueFirstVariable,
                                setValueSecondVariable) => {

    // первая проверка на то что массив данных не null
    if(currency){

        // через фильтр находим нужный обьект первой и второй валюты из массива
        let valueCurrentCurrencyFirst = currency.filter((elem) => elem.ccy == currencyNameFirstVariable)
        let valueCurrentCurrencySecond = currency.filter((elem) => elem.ccy == currencyNameSecondVariable)
        
        // так как обьекта с ключ/значением elem.ccy : "UA" в массиве нет то делаем проверки
        if(currencyNameSecondVariable == "UA" && currencyNameFirstVariable == "UA" ){
            setValueSecondVariable(Math.floor(valueFirstVariable * 10)/10)
            return;
        }else if(currencyNameSecondVariable == "UA" && currencyNameFirstVariable !== "UA"){
            setValueSecondVariable(Math.floor(valueCurrentCurrencyFirst[0].buy * +valueFirstVariable * 10)/10)
            return;
        }else if(currencyNameFirstVariable == "UA"){
            let value = +valueFirstVariable / valueCurrentCurrencySecond[0].buy;
            setValueSecondVariable(Math.floor(value * 10)/10)
            return;
        }else if(currencyNameFirstVariable == currencyNameSecondVariable){
            setValueSecondVariable(Math.floor(valueFirstVariable * 10)/10)
            return;
        }else{
            let valueToUa = valueCurrentCurrencyFirst[0].buy * valueFirstVariable;
            let valueSecondMath = Math.floor(valueToUa/valueCurrentCurrencySecond[0].buy * 10)/10;
            setValueSecondVariable(valueSecondMath)
            return;
        }
    }
    }


    // создал значение которое будет меняться в зависмомти от какой части конвертера 
    // вызываеться фун-я так как 1 фун-я работает в 2-х направлениях
    useEffect(()=>{
        if(activeInput == "first"){
          changeValueCurrency(currencyNameFirst,currencyNameSecond,valueFirst,setValueSecond)  
        }else if(activeInput == "second"){
          changeValueCurrency(currencyNameSecond,currencyNameFirst, valueSecond,setValueFirst)            
        } 
    }, [activeInput, valueFirst, valueSecond, currencyNameFirst, currencyNameSecond])

    return ( 
        <div className='currency__wrap'>
            <div className="currency__form">
                <UnstyledInputBasic
                // фун-я изминения value
                        setValue={setValueFirst}
                        // передача самого value
                        value={valueFirst} 
                        // передаю значение от какого имени будет запускаться фу-я
                        addiction="first"
                        // передаю вызов фун-и для изминения конвертации
                        changeCurrency={setActiveInput}/>
                <UnstyledSelectSimple 
                        // базовая валюта
                        base="UA" 
                        // передаю вызов фун-и для изминения конвертации
                        changeCurrency={setActiveInput}
                        // передаю значение от какого имени будет запускаться фу-я
                        addiction="first"
                        // фун-я изминения имени валюты
                        setCurrencyName={setCurrencyNameFirst} />
            </div>
            <div className="currency__form">
                <UnstyledInputBasic 
                // фун-я изминения value
                        setValue={setValueSecond}
                        // передача самого value 
                        value={valueSecond}
                        // передаю значение от какого имени будет запускаться фу-я
                        addiction="second"
                        // передаю вызов фун-и для изминения конвертации
                        changeCurrency={setActiveInput}/>
                <UnstyledSelectSimple 
                        // базовая валюта
                        base="USD" 
                        // передаю значение от какого имени будет запускаться фу-я
                        addiction="second"
                        // передаю значение от какого имени будет запускаться фу-я
                        changeCurrency={setActiveInput}
                        // фун-я изминения имени валюты
                        setCurrencyName={setcurrencyNameSecond}/>
            </div>
        </div>
     );
}
 
export default Currency;