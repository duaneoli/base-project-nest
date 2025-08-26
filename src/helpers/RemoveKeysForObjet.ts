export function removeKeys<T>(obj: T, keysToRemove: string[]): Partial<T> {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => removeKeys(item, keysToRemove)) as any
  }

  const result: { [key: string]: any } = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !keysToRemove.includes(key)) {
      result[key] = removeKeys(obj[key], keysToRemove)
    }
  }

  return result as T
}
