const extend = require('..')
const { equal } = require('assert')
const pack = require('../package.json')

describe(pack.name, function () {

  it('basic', function () {
    let a = {
      x: '3',
      y: true,
      z: {
        ff: 'as',
        gg: 0,
        hh: {
          kl: 'sa'
        },
        ll: 'sdf',
        arr: [7],
        func: 'sdfsd'
      }
    }

    let b = {
      x: 6,
      y: false,
      z: {
        ff: 'as8',
        gg: 56,
        jj: 'asd',
        hh: {
          kl: (ori) => ori + '5',
          hhg: 'sdf'
        },
        arr: '90',
        func: () => () => 'sdfds'
      }
    }

    extend(a, b)
    equal(a.x, 6)
    equal(a.y, false)
    equal(a.z.ff, 'as8')
    equal(a.z.hh.kl, 'sa5')
    equal(a.z.ll, 'sdf')
    equal(a.z.hh.hhg, 'sdf')
    equal(a.z.arr, '90')
    equal(a.z.func(), 'sdfds')
  })

})
