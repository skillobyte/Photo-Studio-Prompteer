
export default function formatShutter(value) {
    if (value >= 1) return `${value}s`;
    return `1/${Math.round(1 / value)}s`;
}