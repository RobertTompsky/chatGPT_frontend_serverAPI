export const formatedData = (defaultDate: string): string => {
    const date = new Date(defaultDate);
    const formatedDate = date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
    return formatedDate
}