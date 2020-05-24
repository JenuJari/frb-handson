try {

  window.$ = require("jquery");
  window._ = require("lodash");
  // window.null_href = "javascript:void 0";
  window.moment = require("moment");
  window.axios = require("axios");

  require("popper.js");
  require("bootstrap/dist/js/bootstrap.bundle.min");

  // window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  // window.axios.defaults.baseURL = `${process.env.REACT_APP_API_PATH}`;

  // Check if element exists
  window.$.fn.elExists = function () {
    return this.length > 0;
  };
} catch (e) {
  // eslint-disable-next-line
  console.error(e);
}