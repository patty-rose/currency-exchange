export class CurrencyService {
  static getCurrencyList() {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }

  static getExchange(currency1, currency2, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/kwp/${amount}`)
      .then(function(response) {
        console.log(response);
        let notOkError;
        if (!response.ok) {
          notOkError = ([response.statusText, response.status]);
        }
        let responseJSON = response.json();
        let errorAndJSON = [notOkError, responseJSON];
        return errorAndJSON;
      })
      .then(function(errorAndJSON) {
        console.log(errorAndJSON);
        let notOkError = errorAndJSON[0];
        let responseJSON = errorAndJSON[1];
        console.log(responseJSON);
        if (responseJSON[2]["error-type"] === "unsupported-code") {
          throw Error("invalid currency input");
        } else if(responseJSON["error-type"] === "invalid-key") {
          throw Error("invalid API key");
        } else if (notOkError) {
          throw Error(notOkError);
        }
        return responseJSON;
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}