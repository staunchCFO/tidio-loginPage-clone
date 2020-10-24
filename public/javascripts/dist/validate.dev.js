"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePassword = exports.validateEmail = exports.validateUsername = void 0;

/**
 * Username validation pattern for a user input
 * @param {Username} val 
 */
var validateUsername = function validateUsername(val) {
  var namePattern = /^[a-zA-Z]+([0-9]?)/;

  try {
    if (String(val).match(namePattern)) {
      return {
        name: "Matched",
        value: val.trim()
      };
    } else {
      throw {
        name: "Please provide a valid Username",
        value: null
      };
    }
  } catch (err) {
    return {
      name: err.name,
      value: err.value
    };
  }
};
/**
 * Email validation pattern for a user input
 * @param {Email} val 
 */


exports.validateUsername = validateUsername;

var validateEmail = function validateEmail(val) {
  var emailPattern = /^[a-zA-Z]+((\d+|_+|\.)?([a-zA-Z]+|\d+)*)+@[a-zA-Z]{3,}\.[a-zA-Z]{2,6}$/;

  try {
    if (String(val).match(emailPattern)) {
      return {
        name: "Matched",
        value: val.trim()
      };
    } else {
      throw {
        name: "Please provide a valid email",
        value: null
      };
    }
  } catch (err) {
    return {
      name: err.name,
      value: err.value
    };
  }
};
/**
 * Password validation pattern for a user input
 * @param {Password} val 
 */


exports.validateEmail = validateEmail;

var validatePassword = function validatePassword(val) {
  var passPattern = /[a-zA-Z0-9]{4}/;

  try {
    if (String(val).match(passPattern)) {
      return {
        name: "Matched",
        value: val.trim()
      };
    } else {
      throw {
        name: "Please provide a valid password",
        value: null
      };
    }
  } catch (err) {
    return {
      name: err.name,
      value: err.value
    };
  }
};

exports.validatePassword = validatePassword;