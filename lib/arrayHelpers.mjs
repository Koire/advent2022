export const sum = arr => arr.reduce((total, curr) => total + curr, 0)

export const range = length => [...Array(length).keys()]