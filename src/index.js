import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {CurrencyService} from './services/currency-service.js';

// UI Logic
function populateSelect(response) {
  const currencyCodes = response.supported_codes;
  $('#select').empty();
  currencyCodes.forEach(function(code) {
    $('#currency-from').append($('<option></option>').val(code[0]).html(code[0] + " - " + code[1]));
  });
  currencyCodes.forEach(function(code) {
    $('#currency-to').append($('<option></option>').val(code[0]).html(code[0] + " - " + code[1]));
  });
}

function displayExchangeRate(exchangeResponse, currency2) {
  const exchange = exchangeResponse.conversion_result;
  $('.show-exchange').text(`The exchange is ${exchange} ${currency2}.`);
}

function displayErrors(error) {
  $('.show-exchange').hide();
  $('.show-errors').text(`${error}`);
}

// JQUERY UI Logic
$(document).ready(function() {
  CurrencyService.getCurrencyList()
    .then(function(response) {
      populateSelect(response);
    });

  $('#calculateForm').submit(function(event) {
    event.preventDefault();

    let currency1 = $('#currency-from').val();
    let currency2 = $('#currency-to').val();
    let amount = $('#amount').val();

    CurrencyService.getExchange(currency1, currency2, amount)
      .then(function(exchangeResponse) {
        if (exchangeResponse instanceof Error) {
          throw Error(`${exchangeResponse.message}`);
        } 
        // else if (exchangeResponse.conversion_result === undefined) {
        //   throw Error(`Input error-- input amount must be greater than or equal to 0.01`);
        // }
        displayExchangeRate(exchangeResponse, currency2);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});