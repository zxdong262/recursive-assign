[![Build Status](https://travis-ci.org/zxdong262/recursive-assign.svg?branch=master)](https://travis-ci.org/zxdong262/recursive-assign)

# recursive-assign
just recursive assign

# use

```bash
npm i recursive-assign
```

```js
const extend = require('recursive-assign')
const { equal } = require('assert')

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
      arr: [7]
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
        kl: (ori) => ori + '5', //use function to change original value
        hhg: 'sdf'
      },
      arr: '90'
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
```

## License
MIT