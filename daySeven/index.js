import { fileSystem } from "./fileSystem.mjs"
import {asPipe, pipe} from "../lib/pipe.mjs"
import { importInput } from "../lib/fetchInput.mjs"
import { delayPromise } from "../lib/arrayHelpers.mjs"

const input = document.getElementById("input")
const fileOutput = document.getElementById("fileOutput")

const findLowDirs = (limit = 100000, limiting = false) => {
    const recurse = (dirs) => {
    return dirs.map(dir => {
        if(!limiting &&dir.du() >= limit || limiting && dir.du() <= limit) {
            return [dir.du() , ...(dir.ls().dirs.length > 0 ? recurse(dir.ls().dirs).flat() : [])]
        }
        return recurse(dir.ls().dirs)
        }).flat()
    }
    return recurse
}

const visualCommands = ({commandList, fs, ...rest}) => {
    const commands = pipe(
        (arr) => arr.map(_command => () => {
            input.innerText = _command
            if(_command.includes("cd")) {
                fs.cd(_command.split(" ")[2])
                fileOutput.innerHTML = fs.ls().dirs.map(dir => dir.name).join("<br\>") + fs.ls().files.map(file => file.name + " " + file.size + " bytes").join("<br\>")
            }
        }),
        delayPromise()
        )(commandList)
    return {
        commands, ...rest, fs
    }
}

const generateCommands = (readLines) => {
    const fs = fileSystem()
    const commandList = readLines.map(_line => {
        const splitLine = _line.split(" ")
        if(_line.includes("cd")) {fs.cd(splitLine[2])}
        if(_line.includes("dir")) {fs.mkdir(splitLine[1])}
        if(_line.match(/(\d).*/)) fs.dd(splitLine[1], Number(splitLine[0]))
        if(_line.includes("$")) return _line
    }).filter(x => x)
    fs.cd("/")
    return {readLines, commandList, fs}
}
const part1 = ({fs, ...rest}) => {
    return {
        part1: findLowDirs(100000, true)(fs.ls().dirs).reduce((sum, total) => sum+total, 0),
        fs, ...rest
    }
}
const part2 = ({fs, ...rest}) => {
    const neededSpace = 30000000 - (70000000 - fs.du())
    return {
        part2:findLowDirs(neededSpace, false)(fs.ls().dirs).reduce((min, curr) => curr < min ? curr: min, Infinity),
        fs, ...rest
    }
}
await asPipe(
    importInput,
    generateCommands,
    part1,
    part2,
    visualCommands,
    console.log
)("input.txt")
