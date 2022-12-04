//import the data
const fs = require("fs")
const input = fs.readFileSync("input.txt").toString()

//split each line in half
const splitArray = (array) => {
    const halfMark = Math.ceil(array.length / 2)
    const first = array.slice(0, halfMark).split("")
    const second = array.slice(halfMark).split("")
    return [first, second]
}

//count the points lowercase is 1-26, uppercase is 27-52
const getPoints = (char) => {
    return  ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char) + 1) 
}

//check if a character from one half is in the other
const checkArrays = ([first=[], second = []]) => [...new Set(first.filter(_first => second.includes(_first)))][0]

console.log(
    input.split("\n")
    .map(splitArray)
    .map(checkArrays)
    .map(getPoints)
    .reduce((score, current) => current + score, 0)
)

