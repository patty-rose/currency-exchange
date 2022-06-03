export class CurrencyService {
  static getExchange(currency1, currency2, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}/${amount}`)
      .then(function(response) {
        console.log('response.status: ', response.status);
        console.log(response);
        if (!response.ok)
        { 
          if (response.status === 404) {
          throw Error("404-- invalid currency");
        } else if(response.status === 403) {
          throw Error("403-- API error");
        }
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}