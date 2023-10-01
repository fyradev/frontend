export default function convertBytes(value: number) {
    const units = ["B", "KB", "MB", "GB", "TB", "PB"];
    let unitIndex = 0;
    while(value >= 1024) {
        value /= 1024;
        unitIndex++;
    }
    return `${value.toFixed(0)} ${units[unitIndex]}`;
}