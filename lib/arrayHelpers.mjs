export const sum = arr => arr.reduce((total, curr) => total + curr, 0)

export const range = length => [...Array(length).keys()]

const startPromise = new Promise((res) => setTimeout(() => res()), 500)
export const delayPromise = (delay=100) => arr => arr.reduce((lastFn, currentFn) => {
    return lastFn.then(() => new Promise((res) => setTimeout(() => res(currentFn()), delay)))
}, startPromise)