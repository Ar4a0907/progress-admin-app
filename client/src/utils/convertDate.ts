export function convertDate(date: string) {
    const initDate = new Date(date);

    const yyyy = initDate.getFullYear();
    let mm: string | number = initDate.getMonth() + 1; // Months start at 0!
    let dd: string | number = initDate.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return `${ dd }.${ mm }.${ yyyy }`;
}