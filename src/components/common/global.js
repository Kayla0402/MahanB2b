exports.install = function (Vue, options) {
  Vue.prototype.getUserId = async function (params) {
    let userJsonStr = await sessionStorage.getItem(params)
    let userInfo = JSON.parse(userJsonStr)
    console.log(userInfo)
  }
  Vue.prototype.getToken = function (params) {
    let token = sessionStorage.getItem(params)
    return token
  }
  Vue.prototype.isADT = function (date) {
    let year = new Date().getFullYear() - (date.substring(0, 4))
    let month = (new Date().getMonth() + 1) - (date.substring(5, 7))
    let day = new Date().getDay() - (date.substring(8, 10))
    if (year > 18) {
      return '成人'
    } else if (year < 18) {
      return '儿童'
    }
    if (month > 0) {
      return '成人'
    } else if (month < 0) {
      return '儿童'
    }
    return day >= 0 ? '成人' : '儿童'
  }
  Vue.prototype.getCity = function (city) {
    console.log(111)
  }
}
