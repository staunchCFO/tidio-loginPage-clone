"use strict";

var _api = require("./api.js");

var _validate = require("./validate.js");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccountModel = {
  validFormValue: {}
};

var AccountView = function AccountView() {
  _classCallCheck(this, AccountView);

  this.inputs = Array.from((0, _api.selectAll)(".validate"));
};

var AccountController =
/*#__PURE__*/
function () {
  function AccountController(view, model) {
    _classCallCheck(this, AccountController);

    this.view = new view();
    this.model = model;
    this.addEvent();
  }

  _createClass(AccountController, [{
    key: "handleBlur",
    value: function handleBlur(event) {
      if (event.target.id === "username") {
        if (event.target.value !== " " && event.target.value.trim().length > 0) {
          AccountModel.validFormValue["".concat(event.target.id)] = event.target.value;
        }

        event.target.value = event.target.value;
        event.target.removeEventListener("focus", this.handleBlur);
      }

      if (event.target.id === "email") {
        if ((0, _validate.validateEmail)(event.target.value).value) {
          AccountModel.validFormValue["".concat(event.target.id)] = event.target.value;
        }

        event.target.value = event.target.value;
        event.target.removeEventListener("focus", this.handleBlur);
      }

      if (event.target.id === "password") {
        if ((0, _validate.validatePassword)(event.target.value).value) {
          AccountModel.validFormValue["".concat(event.target.id)] = event.target.value;
        }

        event.target.value = event.target.value;
        event.target.removeEventListener("focus", this.handleBlur);
      }
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      if (event.target.id === "register-submit") {
        event.preventDefault();

        if (AccountModel.validFormValue.username && AccountModel.validFormValue.email && AccountModel.validFormValue.password) {
          var dataToSend = {
            username: AccountModel.validFormValue.username,
            email: AccountModel.validFormValue.email,
            password: AccountModel.validFormValue.password
          };
          (0, _api.sendData)("/register-api", dataToSend).then(function (res) {
            console.log(res);

            if (res.status > 200) {
              (0, _api.selector)('#response-register').classList.remove('err-msg', 'success-msg');
              (0, _api.selector)('#response-register').classList.add('err-msg');
              (0, _api.selector)('#response-register').textContent = res.message;
            } else {
              (0, _api.selector)('#response-register').classList.remove('err-msg', 'success-msg');
              (0, _api.selector)('#response-register').classList.add('success-msg');
              (0, _api.selector)('#response-register').textContent = res.message;
              setTimeout(function () {
                window.location.reload(false);
              }, 2000);
            }
          })["catch"](function (error) {
            return console.log(error);
          });
        } else if (AccountModel.validFormValue.username && AccountModel.validFormValue.email) {
          (0, _api.selector)('#response-register').classList.remove('err-msg', 'success-msg');
          (0, _api.selector)('#response-register').classList.add('err-msg');
          (0, _api.selector)('#response-register').textContent = "Password too weak or doesn't match.";
        } else {
          (0, _api.selector)('#response-register').classList.remove('err-msg', 'success-msg');
          (0, _api.selector)('#response-register').classList.add('err-msg');
          (0, _api.selector)('#response-register').textContent = "Please fill in valid details.";
        }
      }
    }
  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this = this;

      this.view.inputs.map(function (field) {
        field.addEventListener("blur", _this.handleBlur);
        field.addEventListener("click", _this.handleSubmit);
      });
    }
  }]);

  return AccountController;
}();

var app = new AccountController(AccountView, AccountModel);