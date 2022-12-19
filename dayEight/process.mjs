import {importInputAsArray} from "../lib/importInput.mjs"
import { pipe } from "../lib/pipe.mjs"
import { sum } from "../lib/arrayHelpers.mjs"

const UP = [0, -1]
const DOWN = [0, 1]
const LEFT = [-1, 0]
const RIGHT = [1, 0]
const directions = [UP, DOWN, LEFT, RIGHT]

const makeTreeGrid = input => {
    return input.map((row) => row.split("").map(Number))
}


const checkVisibility = (trees, ) => {
    return trees.map((row, startY) => {
        return row.map((tree, startX) => {
            const visibility = directions.map(([dirX , dirY]) => {
                const checkTree = ([x,y]) => {
                    // part1 is true/false
                    // part2 is 1 or 0 and then reduced.
                    if ( x < 0 || x >= row.length || y < 0 || y >= trees.length) return 0
                    if ( trees[y][x] >= tree) return 1
                    return 1 + checkTree([x + dirX, y + dirY])
                }
                return checkTree([startX + dirX, startY + dirY])
            })
            return visibility
        })
    })
}

const part1 = visibility => {
    const visibleTreeCount = visibility.map((row, idx) => {
        return row.map((tree, idx2) => {
            const [upCount, downCount, leftCount, rightCount ] = tree
            return upCount - 1 == idx 
                || downCount == (visibility.length - 1 - idx)
                || leftCount == idx2
                || rightCount == row.length - 1 - idx2
        })
    }).filter(x => x)
    return {
        visibility,
        visibleTreeCount
    }
}


pipe(
    importInputAsArray,
    makeTreeGrid,
    checkVisibility,
    part1,
    ({visibleTreeCount, visibility}) => {
        console.log(visibleTreeCount)
        console.log(visibility)
    },
)("input.txt")

