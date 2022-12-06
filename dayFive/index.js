import { css } from "../lib/css.mjs"
import { sleep } from "../lib/sleep.mjs"
import { range } from "../lib/arrayHelpers.mjs"

const input = await fetch("input.txt")
                    .then(res => res.text())
                    .then(txt => txt
                        .split("\n")
                        .filter(x => x)
                        .map(row => row.includes("[") ? row.match(/.{1,4}/g) : row)
                    )

const crates = input.filter(row => Array.isArray(row)).reduce((crates, currentRow) => {
    currentRow.forEach((crateValue, idx) => {
        crates[idx] = [crateValue.trim(), ...(crates[idx] ? crates[idx] : [])].filter(it => it.includes("["))
    })
    return crates
},[])

const moves = input.filter(row => row.includes("move"))
const crateHolder = document.getElementById("crates")

const createCrate = (crate, idx, idx2) => {
    const container = document.createElement("span")
    const icon = document.createElement("img")
    icon.src = "./box-solid.svg"
    container.appendChild(icon)
    container.id = `crate-${idx}-${idx2}`
    container.classList.add("crate")
    container.setAttribute("data-value", crate)
    container.textContent = crate
    css(container, {left: `${idx * 40}px`, bottom: `${idx2 * 30}px`, width: "25px", textAlign: "center", position: "absolute"})
    return container
}


crates.forEach((stack, idx) => {
    stack.forEach((crate, idx2) => {
        crateHolder.append(createCrate(crate, idx, idx2))
    })
})

const getIndexes = (move) => {
    const [amount, fromCol, toCol] = move.match(/(\d+)/g).map(Number)
    return [amount, fromCol - 1, toCol - 1]
}

const crateCopy = crates.map(row => [...row])

//solution
moves.forEach((move, idx) => {
    const [amount, fromCol, toCol] = getIndexes(move)
    for ( let i = 0; i < amount; i++) {
        crateCopy[toCol].push(crateCopy[fromCol].pop())
    }
})

const copyArray = arr => arr.map(row => [...row])

const partTwo = crates.map(row => [...row])

moves.forEach((move, idx) => {
    const [amount, fromCol, toCol] = getIndexes(move)
    const stack = partTwo[fromCol]
    const remainder = stack.slice(0, stack.length - amount)
    const moveStack = stack.slice(stack.length - amount)
    partTwo[fromCol] = [...remainder]
    partTwo[toCol].push(...moveStack)
    
})

console.log(crateCopy.map(row => row.pop().match(/\[(\w)\]/)[1]).join(""))
console.log(partTwo.map(row => row.pop().match(/\[(\w)\]/)[1]).join(""))

const moveCrate = (fromCol, offset, toCol, newOffset) => {
    const visCrate = document.getElementById(`crate-${fromCol}-${offset}`)
    visCrate.style.left = `${toCol * 40}px`
    visCrate.style.bottom = `${ newOffset * 30}px`
    visCrate.id = `crate-${toCol}-${newOffset}`
}

const doPartTwo = () => {
    const crateList = copyArray(crates)
    moves.forEach((move, idx) => {
        const [amount, fromCol, toCol] = getIndexes(move)
        const stack = crateList[fromCol]
        const remainder = stack.slice(0, stack.length - amount)
        const moveStack = stack.slice(stack.length - amount)
        crateList[fromCol] = [...remainder]
        crateList[toCol].push(...moveStack)
        moveStack.forEach((crate, idx2) => {
            const offset = crateList[toCol].length - moveStack.length
            setTimeout(() => {
                
            },  idx * 200 + i * 200)
        })
        
    })
}
const startPromise = new Promise((res) => setTimeout(() => res("console.log")), 500)
const doPartOne = async () => {
    const crateList = copyArray(crates)
    return moves.map((move) => {
        const [amount, fromCol, toCol] = getIndexes(move)
        return range(amount).map(() => {
            const offset = crateList[fromCol].length - 1
            const crate = crateList[fromCol].pop()
            crateList[toCol].push(crate)
            const newOffset = crateList[toCol].length - 1
            return () => moveCrate(fromCol, offset, toCol, newOffset)
        })
    })
    .flatMap(fn => fn)
    .reduce((lastFn, currentFn) => {
            return lastFn.then(() => new Promise((res) => setTimeout(() => res(currentFn()), 300)))
    }, startPromise)
}
await doPartOne()
console.log(doPartOne())