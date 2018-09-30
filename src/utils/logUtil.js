const info = function info() {
  console.info.apply(console, Array.prototype.slice.call(arguments, 0));
};

const warn = function warn() {
  console.warn.apply(console, Array.prototype.slice.call(arguments, 0));
};

const error = function error() {
  console.error.apply(console, Array.prototype.slice.call(arguments, 0));
};

export default {
  info,
  warn,
  error
};
