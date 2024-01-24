export const hasSpaces = (str: string): boolean => {
  return str.includes(' ')
}

export const isNotNumber = (str: string): boolean => {
  return str.split('').some((char) => isNaN(Number(char)))
}

export const isNotDecimalNumber = (str: string): boolean => {
  if (
    str.split('').some((char) => isNaN(Number(char)) && char !== '.') ||
    str.split('.').length > 2
  ) {
    return true
  }
  return false
}

export const hasMoreThanTwoDecimals = (str: string): boolean => {
  if (str.split('.').length === 2 && str.split('.')[1].length > 2) return true
  return false
}
