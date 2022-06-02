export class CurrencyService {
  static getCurrency(currency1, currency2, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD/pair/${currency1}/${currency2}/${amount}`)
    .then(function(response) {
      if (!response.ok)
      {
        throw Error(response.error-type)
      }
      return response.json();
    })
    .catch(function(error) {
      return Error(error);
    })
  }
}