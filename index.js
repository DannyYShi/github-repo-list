'use strict';

function getRepoList(input) {
  let apiUrl = `https://api.github.com/users/${input}/repos`;
  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#error-message').text(`Something went wrong: ${err.message}`);
      $('#results').addClass('hidden');
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  for (let i = 0; i < responseJson.length; i++) {
    $('#resultsList').append(`<li><a href='${responseJson[i].html_url}'>${responseJson[i].name}</a></li>`);
    $('#results').removeClass('hidden');
  }
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    clearPrevResults();
    getRepoList($('#github-user').val());
  });
}

function clearPrevResults() {
  $('#resultsList').empty();
  $('#error-message').text('');
}

$(function () {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});