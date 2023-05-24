export function filterSeparate<T>(value: Array<T>, trueFunction: (it: T) => boolean): [Array<T>, Array<T>] {
  const response = Array<Array<T>>([], [])
  value.forEach((it) => {
    if (trueFunction(it)) response[0].push(it)
    else response[1].push(it)
  })
  return [response[0], response[1]]
}
