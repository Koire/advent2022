import { importInputAsArray } from "../lib/importInput.mjs";
import { pipe } from "../lib/pipe.mjs"

const splitPair = pair => pair.split("-")

const mapPairs = arr => arr.map((_pair) => _pair.split(",").map(it => splitPair(it).map(item => Number(item))))


const checkIncludes = ([[oneStart, oneEnd], [twoStart, twoEnd]]) => {
    return (oneStart >= twoStart && oneStart <= twoEnd && oneEnd <= twoEnd && oneEnd >= twoStart) 
}

const evaluatePairs = pairs => pairs.map( pair => checkIncludes([pair[0], pair[1]]) || checkIncludes([pair[1], pair[0]])).filter(x => x).length


pipe(
    importInputAsArray,
    mapPairs,
    evaluatePairs,
    console.log
)("input.txt")