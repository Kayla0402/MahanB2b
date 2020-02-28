exports.install = function (Vue, options) {
  function format (val) {
    return Number(val) < 10 ? '0' + val : '' + val
  }
  Vue.prototype.formatDate = function(options) {
    let year = options.getFullYear()
    let month = format(options.getMonth() + 1)
    let da = format(options.getDate())
    return year + '-' + month + '-' + da
  }
}
