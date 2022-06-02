import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {CurrencyService} from './services/currency-service.js';

// UI Logic

// JQUERY UI Logic
$(document).ready(function() {
  $('#calculate').click(function() {
    let currency1 = "USD";
    let currency2 = "EUR";
    let amount = $('#amount').val();
    CurrencyService.getExchange(currency1, currency2, amount)
      .then(function(exchangeResponse) {
        console.log(exchangeResponse);
        if (exchangeResponse instanceof Error) {
          throw Error(`API error: ${exchangeResponse.message}`);
        }
        const exchange = exchangeResponse.conversion_result;
        $('.show-exchange').text(`The exchange is ${exchange} ${currency2}.`);
      })
      .catch(function(error) {
        $('.show-errors').text(`${error}`);
      });
  });
});