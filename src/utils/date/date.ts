export function getCurrentDate(): string {
    const date = new Date();
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = String(date.getFullYear());
    let dateFormatted = `${year}-${month}-${day}`;
    return dateFormatted
}

export function formatDate(date: string) {
    let [year, month, day] = String(date).split("-");
    return `${month}-${day}-${year}`
};

export function unformatDate(date: string) {
    let [month, day, year] = String(date).split("-");
    return `${year}-${month}-${day}`
};

export function isBeforeToday(day: string) {
    let today = getCurrentDate();

    if (day < today) return true

    if (day >= today) return false
};