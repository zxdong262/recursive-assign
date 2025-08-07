
# recursive-assign

A TypeScript library for recursively assigning properties from one object to another with support for function-based transformations.

## Features

- 🚀 Written in TypeScript with full type safety
- 📦 Supports both ESM and CommonJS
- 🔄 Recursive deep assignment
- 🛡️ Prototype pollution protection
- ⚡ Zero dependencies (removed lodash)
- 🧪 Comprehensive test suite with Vitest

## Installation

```bash
npm install recursive-assign
```

## Usage

### ESM (Recommended)

```typescript
import recursiveAssign from 'recursive-assign'

const target = {
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
    func: 'sd'
  }
}

const source = {
  x: 6,
  y: false,
  z: {
    ff: 'as8',
    gg: 56,
    jj: 'asd',
    hh: {
      kl: (original: string) => original + '5', // Function to transform original value
      hhg: 'sdf'
    },
    arr: '90',
    func: () => () => 'safds' // Replace with a function
  }
}

recursiveAssign(target, source)

console.log(target.x) // 6
console.log(target.y) // false
console.log(target.z.ff) // 'as8'
console.log(target.z.hh.kl) // 'sa5' (transformed by function)
console.log(target.z.ll) // 'sdf' (unchanged)
console.log(target.z.hh.hhg) // 'sdf' (added)
console.log(target.z.arr) // '90'
console.log(target.z.func()) // 'safds'
```

### CommonJS

```javascript
const recursiveAssign = require('recursive-assign').default
// or
const { recursiveAssign } = require('recursive-assign')
```

## API

### `recursiveAssign<T>(target: T, source: Record<string, any>): T`

Recursively assigns properties from the `source` object to the `target` object.

**Parameters:**
- `target`: The target object to assign properties to
- `source`: The source object to copy properties from

**Returns:** The modified target object

**Behavior:**
- Plain objects are merged recursively
- Functions in the source object are called with the original value from the target
- Other values are assigned directly
- Prototype pollution is prevented (ignores `__proto__`, `constructor`, `prototype`)

## Development

### Building

```bash
npm run build
```

This creates:
- `dist/esm/` - ES modules
- `dist/cjs/` - CommonJS modules  
- `dist/types/` - TypeScript declarations

### Testing

```bash
npm test        # Run tests in watch mode
npm run test:run # Run tests once
```

## License

MIT