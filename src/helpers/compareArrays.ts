export function compareArrays(array1: string[], array2: string[]) {
    return array1.concat(array2).filter((item, _, arr) => arr.indexOf(item) === arr.lastIndexOf(item));
}
