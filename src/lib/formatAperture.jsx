
export default function formatAperture(value) {
    return `f/${Number(value).toFixed(value < 2 ? 1 : value % 1 === 0 ? 0 : 1)}`;
}