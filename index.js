
/**
 * recursive-assign
 * @param {object} obj1
 * @param {object} obj2
 */
const _ = require('lodash')
function recExtend(obj1, obj2) {
  var ks = _.keys(obj2)
  _.each(ks, function(key) {
    if (key !== '__proto__' && key !== 'constructor' && key !== 'prototype') {
      var res1 = obj1[key]
      var res2 = obj2[key]
      if (_.isPlainObject(res1) && _.isPlainObject(res2)) {
        recExtend(obj1[key], res2)
      } else if (_.isFunction(res2)) {
        obj1[key] = res2(res1)
      } else {
        obj1[key] = res2
      }
    }
  })
  return obj1
}

module.exports = exports.default = recExtend
