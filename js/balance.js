'use strict';
// For frequent words vs rare ones
/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */
module.exports = function(value,condition) {
  var decision;
  switch (true) {
    case (value > condition):decision=2;break;
    default:decision=1;
  return decision;
};
