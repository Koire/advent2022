export const css = (e, styles) => {
    for (const property in styles)
        e.style[property] = styles[property];
}