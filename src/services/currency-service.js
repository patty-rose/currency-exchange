export class CurrencyService {
  static getExchange(currency1, currency2, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}/${amount}`)
      .then(function(response) {
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