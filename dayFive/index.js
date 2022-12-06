import { css } from "../lib/css.mjs"

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

const crateCopy = crates.map(row => row.slice())

//solution
moves.forEach((move, idx) => {
    const [amount, fromCol, toCol] = getIndexes(move)
    for ( let i = 0; i < amount; i++) {
        crateCopy[toCol].push(crateCopy[fromCol].pop())
    }
})
console.log(crateCopy.map(row => row.pop().match(/\[(\w)\]/)[1]).join(""))


moves.forEach((move, idx) => {
    const [amount, fromCol, toCol] = getIndexes(move)
    for ( let i = 0; i < amount; i++) {
        setTimeout(() => {
            const offset = crates[fromCol].length - 1 
            const crate = crates[fromCol].pop()
            const visCrate = document.getElementById(`crate-${fromCol}-${offset}`)
            crates[toCol].push(crate)
            const newOffset = crates[toCol].length - 1
            visCrate.style.left = `${toCol * 40}px`
            visCrate.style.bottom = `${ newOffset * 30}px`
            visCrate.id = `crate-${toCol}-${newOffset}`
        }, idx * 200 + i * 100)
        
    }  
})
                