import { range } from "../lib/arrayHelpers.mjs";
import { importInputAsArray } from "../lib/importInput.mjs";
import { pipe } from "../lib/pipe.mjs";

const UP = [0, -1]
const DOWN = [0, 1]
const LEFT = [-1, 0]
const RIGHT = [1, 0]
const directions = {
    U: UP,
    D: DOWN,
    L: LEFT,
    R: RIGHT
}

const dirs = arr => arr.map(it => [
    it.split(" ")[0],
    Number(it.split(" ")[1])
])

const moveTail = ([Tx, Ty], [Hx, Hy]) => {
    const dX = Tx - Hx
    const dY = Ty - Hy
    const distance = Math.max(Math.abs(dX), Math.abs(dY))
    if(distance == 2) {
        const moveX = dX != 0 ? dX < 0 ? 1 : -1 : 0
        const moveY = dY != 0 ? dY < 0 ? 1 : -1 : 0
        return [Tx + moveX, Ty + moveY]
    }
    return [Tx, Ty]
}

const setUp = (numberOfTails) => {
    let head = [0,0]
    let tails = Array(numberOfTails).fill([0,0])
    const places = new Set()
    const move = ([x,y]) => {
       head = [head[0] + x, head[1] + y]
       tails.forEach((_tail, idx) => {
            let _head = idx == 0 ? head : tails[idx - 1]
            tails[idx] = moveTail(_tail, _head)
            if(idx === tails.length - 1) places.add(`${tails[idx][0]}/${tails[idx][1]}`)
       })
       return places
    }
    return {
        head, 
        tails, 
        places,
        move
    }
}

const processMoves = (moves=[]) => {
    const {move, places} = setUp(1)
    moves.map(_move => {
        const [dir, times]  = _move
        Array(times)
        .fill("")
        .map(_ => {
            move(directions[dir])
        })
    })
    return places.size
}

pipe(
    importInputAsArray,
    dirs,
    processMoves,
    console.dir
)("input.txt")
