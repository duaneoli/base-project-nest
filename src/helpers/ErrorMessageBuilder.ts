export class ErrorMessageBuilder {
  static uniqueKeyViolation(message: string) {
    const match = message.match(/=\(.*\)/g)

    return match ? match.toString().replace(/(\=*)/g, '') : null
  }

  static entityNotFound(message: string) {
    const match = message.match(/\".*\": \".*\"/)
    if (!match) return

    return match
      ? match
          .toString()
          .replace(/(\".*\":\ )/g, '')
          .replace(/(\")/g, '')
      : null
  }
}
