export class CurrencyService {
  static getCurrencyList() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }

  static getExchange(currency1, currency2, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}/${amount}`)
      .then(function (response) {
        if (!response.ok && response.status != 404) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return Error(error);
      });
  }
}