// const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
// const json = await res.json();
// const rate = json.Valute.USD.Value;

export const getCurrency = async () =>
    (await fetch('https://www.cbr-xml-daily.ru/daily_json.js')).json();