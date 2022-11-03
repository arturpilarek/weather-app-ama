export function convertKmphToMps (kmph) {
    return (0.277778 * kmph).toFixed(1)
}

export const convertDateFormat = (inputDate, index)  => {
    const date = new Date(inputDate)
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate()
    if (index === 0) {
        return 'I dag'
    } else if (index === 1) {
        return 'I morgen'
    } else {
        return `${day}. ${month}`
    }
}

export const splitToChunks = (array, parts) => {
    let result = [];
    for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
}

export const getAverage = (array) => {
    return array.reduce((a, b) => a + b, 0) / array.length
}

export const getMostFrequentElement = (array) => {
    const store = {}
    array.forEach((num) => store[num] ? store[num] += 1 : store[num] = 1)
    return Object.keys(store).sort((a, b) => store[b] - store[a])[0]
}