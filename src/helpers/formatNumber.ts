export function formatNumber(num: number) {
    const suffixes = ['', 'tys.', 'mln', 'mld', 'bln'];

    let i = 0;
    while (num >= 1000 && i < suffixes.length - 1) {
        num /= 1000;
        i++;
    }

    num = Math.round(num * 100) / 100;

    return num.toString() + ' ' + suffixes[i];
}
