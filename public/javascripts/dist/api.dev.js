"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendData = exports.getWithToken = exports.getData = exports.createElement = exports.selectAll = exports.selector = void 0;

var selector = function selector(e) {
  return document.querySelector(e);
};

exports.selector = selector;

var selectAll = function selectAll(e) {
  return document.querySelectorAll(e);
};

exports.selectAll = selectAll;

var createElement = function createElement(e) {
  return document.createElement(e);
};
/**  
 * Sends a get request to the server
*/


exports.createElement = createElement;

var getData = function getData(url) {
  var data, parseRes;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            redirect: "follow",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          }));

        case 3:
          data = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(data.json());

        case 6:
          parseRes = _context.sent;
          return _context.abrupt("return", parseRes);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
/**
 * Sends a get request to the server with token 
 */


exports.getData = getData;

var getWithToken = function getWithToken(url, host, userToken) {
  var data, parseRes;
  return regeneratorRuntime.async(function getWithToken$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            redirect: "follow",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "authorization": "Bearer" + " " + userToken,
              "host": host
            }
          }));

        case 3:
          data = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(data.json());

        case 6:
          parseRes = _context2.sent;
          return _context2.abrupt("return", parseRes);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", _context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
/**Sends a delete request to the server */


exports.getWithToken = getWithToken;

var deleteUser = function deleteUser(url) {
  var data, parseRes;
  return regeneratorRuntime.async(function deleteUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch(url, {
            method: "DELETE",
            mode: "same-origin",
            cache: "force-cache",
            redirect: "follow",
            header: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          }));

        case 3:
          data = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(data.json());

        case 6:
          parseRes = _context3.sent;
          return _context3.abrupt("return", parseRes);

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", _context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
/** Send Data */


var sendData = function sendData(url, data) {
  var useData, parseRes;
  return regeneratorRuntime.async(function sendData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetch(url, {
            method: 'POST',
            redirect: "follow",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }));

        case 3:
          useData = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(useData.json());

        case 6:
          parseRes = _context4.sent;
          return _context4.abrupt("return", parseRes);

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", _context4.t0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.sendData = sendData;