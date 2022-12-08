
const file = (name, size) => ({name, size})

const dir = (dirName, parent) => {
    const dirs = []
    const files = []
    const self = {dirs, files, name: dirName, parent,
        dd: (fileName, size) => files.push(file(fileName, size)),
        mkdir: (dirName) => dirs.push(dir(dirName, self)),
        ls: () => ({name: dirName, dirs, files}),
        du: () => {
            const dirSize = dirs.reduce((total, currentDir) => {
                return total + currentDir.du()
            }, 0)
            const fileSize = files.reduce((total, {size}) => {
                return total + size
            }, 0)
            return dirSize + fileSize
        },
        cd: (dirName) => {
            if (dirName == ".." && parent) return parent
            return dirs.find(dir => dir.name == dirName)
        }
    }
    return self
        
}

export const fileSystem = () => {
    const root = dir("/")
    let current = root
    return {
        mkdir: (name = "") => current.mkdir(name),
        ls: () => current.ls(),
        dd: (fileName="", size=0) => current.dd(fileName, size),
        du: () => current.du(),
        cd: (dirName = "") => {
            current = dirName === "/" ? root : (current.cd(dirName) || current)
            return current
        },
        name: () => current.name,
        pwd: () => current
    }
}