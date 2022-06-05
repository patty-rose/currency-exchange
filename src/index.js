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

function displayExchange(exchangeResponse) {
  console.log(exchangeResponse);
  const exchange = exchangeResponse.conversion_result;
  $('#to-amount').val(exchange);
  $('#amountCalculated').text(exchange);
  $('#currencyToDisplay').text(exchangeResponse.target_code);
  $('#currencyFromDisplay').text(exchangeResponse.base_code);
  $('.displayConversion').show();
}

function displayErrors(error) {
  $('.show-exchange').hide();
  $('.displayConversion').hide();
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
    let amount = $('#from-amount').val();
    $('#amountEntered').text(amount);

    CurrencyService.getExchange(currency1, currency2, amount)
      .then(function(exchangeResponse) {
        console.log(exchangeResponse);
        if (exchangeResponse["error-type"] === "unsupported-code") {
          throw Error("currency code does not exist");
        } else if (exchangeResponse.result === "success" && exchangeResponse.conversion_result === undefined) {
          throw Error(`Input amount must be greater than or equal to 0.01`);
        } else if (exchangeResponse instanceof Error) { 
          throw Error(`Exchange Rate API ${exchangeResponse}`);
        }
        
        console.log(exchangeResponse);
        displayExchange(exchangeResponse);
      })
      .catch(function(error) {
        console.log(error.message);
        displayErrors(error.message);
      });
  });
});