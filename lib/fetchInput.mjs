export const importInput = async () => await fetch("input.txt")
                    .then(res => res.text())
                    .then(txt => txt
                        .split("\n")
                        .filter(x => x)
                    )