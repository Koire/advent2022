import { importInput } from "../lib/importInput.mjs"
import { pipe } from "../lib/pipe.mjs"
import {calcTune} from "./tune.mjs"

pipe(
    importInput,
    input => input.split("\n")[0],
    calcTune(4),
    console.log
)("input.txt")

pipe(
    importInput,
    input => input.split("\n")[0],
    calcTune(14),
    console.log
)("input.txt")