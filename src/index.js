import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {CurrencyService} from './services/currency-service.js';
import {CurrencyListService} from './services/currencyList-service.js';

// UI Logic
function populateSelect(response) {
  const currencyCodes = Object.keys(response.conversion_rates);
  const ele = document.getElementById('currencyList');
  for (var i = 0; i < currencyCodes.length; i++) {
      ele.innerHTML = ele.innerHTML +
          '<option value="' + currencyCodes[i] + '">' + currencyCodes[i] + '</option>';
  }
}

function displayExchangeRate(exchangeResponse, currency2) {
  const exchange = exchangeResponse.conversion_result;
  $('.show-exchange').text(`The exchange is ${exchange} ${currency2}.`);
}

function displayErrors(error) {
  $('.show-exchange').hide();
  $('.show-errors').text(`${error}`);
}

async function  makeApiCall() {
  const response = await CurrencyListService.getCurrencyList();
  console.log(response);
}

// JQUERY UI Logic
$(document).ready(function() {
  const apiResponse = makeApiCall();
  populateSelect(apiResponse);

  $('#calculateForm').submit(function(event) {
    event.preventDefault();

    let currency1 = $('#currency-from').val();
    let currency2 = $('#currency-to').val();
    let amount = $('#amount').val();

    CurrencyService.getExchange(currency1, currency2, amount)
      .then(function(exchangeResponse) {
        console.log(exchangeResponse);
        if (exchangeResponse instanceof Error) {
          throw Error(`${exchangeResponse.message}`);
        } else if (exchangeResponse.conversion_result === undefined) {
          throw Error(`Input error-- input amount must be greater than or equal to 0.01`);
        }
        displayExchangeRate(exchangeResponse, currency2);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});