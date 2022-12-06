

export const calcTune = (scanLength=4) => (input="") => {
    return input
    .split("")
    .map((_, idx, arr) => {
        const temp = arr.slice(idx, idx+scanLength)
        const unique = temp.map((char) => temp.filter((t) => t == char).length).every((it) => it === 1)
        if (unique) return idx + scanLength
    })
    .find(it => it)
}

