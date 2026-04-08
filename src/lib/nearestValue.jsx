
export default function nearestValue(arr, value) {
    return arr.reduce((prev, curr) =>
            Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
        , arr[0]);
}
