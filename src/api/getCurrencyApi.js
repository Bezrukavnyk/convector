export const getCurrencyApi = () => {
 return fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")
       .then(res => res.json())
}


