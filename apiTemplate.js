'use strict';

const handleErrors = function(response) {
  if(!response.ok) {
    throw new Error((response.status + ': ' + response.statusText));
  }
  if (response.status !== 200) return;
  return response.json();
}

const createRequest = function(url, succeed, fail, init) {
  fetch(url, init)
    .then((response) => handleErrors(response))
    .then((data) => succeed(data))
    .catch((error) => fail(error));
};

export default createRequest;
