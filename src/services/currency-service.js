export class CurrencyService {
  static getExchange(currency1, currency2, amount) {
    let url = (`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}/${amount}`);
    console.log(url);
    return fetch(url)
      .then(function(response) {
        console.log(process.env.API_KEY);
        if (!response.ok)
        {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}