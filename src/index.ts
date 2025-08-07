
/**
 * Checks if a value is a plain object (not an array, null, Date, etc.)
 */
function isPlainObject(value: any): value is Record<string, any> {
  return (
    value !== null &&
    typeof value === 'object' &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}

/**
 * Recursively assigns properties from source object to target object
 * @param target - The target object to assign properties to
 * @param source - The source object to copy properties from
 * @returns The modified target object
 */
function recursiveAssign(
  target: Record<string, any>,
  source: Record<string, any>
): Record<string, any> {
  const keys = Object.keys(source)
  
  for (const key of keys) {
    if (key !== '__proto__' && key !== 'constructor' && key !== 'prototype') {
      const targetValue = target[key]
      const sourceValue = source[key]
      
      if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
        recursiveAssign(target[key], sourceValue)
      } else if (typeof sourceValue === 'function') {
        target[key] = sourceValue(targetValue)
      } else {
        target[key] = sourceValue
      }
    }
  }
  
  return target
}

export default recursiveAssign
export { recursiveAssign }
