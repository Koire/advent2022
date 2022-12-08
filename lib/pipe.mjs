export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)

export const asPipe = (...fns) => x => fns.reduce(async (y, f) => f(await y), x)