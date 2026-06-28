

export const getData = (date: string) => {
    const newDate = new Date(date)
    const day = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate()
    const month = newDate.getMonth() > 9 ? newDate.getMonth() + 1 : '0' + (newDate.getMonth() + 1)
    const year = newDate.getFullYear()
    const hours = newDate.getHours() > 9 ? newDate.getHours() : '0' + newDate.getHours()
    const minutes = newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes()
    return `${hours}:${minutes} ${day}.${month}.${year}`
}

