import { describe, it, expect } from 'vitest'
import recursiveAssign from '../src/index.ts'

describe('recursive-assign', () => {
  it('should perform basic recursive assignment', () => {
    const target: any = {
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

    const source = {
      x: 6,
      y: false,
      z: {
        ff: 'as8',
        gg: 56,
        jj: 'asd',
        hh: {
          kl: (ori: string) => ori + '5',
          hhg: 'sdf'
        },
        arr: '90',
        func: () => () => 'sdfds'
      }
    }

    const result = recursiveAssign(target, source)

    expect(result.x).toBe(6)
    expect(result.y).toBe(false)
    expect(result.z.ff).toBe('as8')
    expect(result.z.hh.kl).toBe('sa5')
    expect(result.z.ll).toBe('sdf')
    expect(result.z.hh.hhg).toBe('sdf')
    expect(result.z.arr).toBe('90')
    expect(result.z.func()).toBe('sdfds')
  })

  it('should not modify prototype-related properties', () => {
    const target: any = { x: 1 }
    const source = {
      __proto__: { malicious: true },
      constructor: { malicious: true },
      prototype: { malicious: true },
      x: 2
    }

    recursiveAssign(target, source)

    expect(target.x).toBe(2)
    expect(target.__proto__.malicious).toBeUndefined()
    expect(target.constructor.malicious).toBeUndefined()
    expect(target.prototype).toBeUndefined()
  })

  it('should handle nested objects correctly', () => {
    const target: any = {
      level1: {
        level2: {
          value: 'original'
        }
      }
    }

    const source = {
      level1: {
        level2: {
          value: 'updated',
          newValue: 'added'
        },
        newLevel2: {
          value: 'new'
        }
      }
    }

    recursiveAssign(target, source)

    expect(target.level1.level2.value).toBe('updated')
    expect(target.level1.level2.newValue).toBe('added')
    expect(target.level1.newLevel2.value).toBe('new')
  })

  it('should execute functions with original values', () => {
    const target: any = {
      counter: 5,
      text: 'hello'
    }

    const source = {
      counter: (original: number) => original + 10,
      text: (original: string) => original + ' world'
    }

    recursiveAssign(target, source)

    expect(target.counter).toBe(15)
    expect(target.text).toBe('hello world')
  })
})
