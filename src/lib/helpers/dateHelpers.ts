import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

export const getDateDiffrenceText = (date1: Date, date2: Date) => {
    const days = differenceInDays(date1, date1)
    // console.log("111 ~ days:", days)
    if (days) {
        return `${days}d`
    }

    const hours = differenceInHours(date1, date1)
    // console.log("111 ~ hours:", hours)
    if (hours) {
        return `${hours}h`
    }

    const minutes = differenceInMinutes(date1, date2)
    // console.log("111 ~ minutes:", minutes)
    if (minutes) {
        return `${minutes}min`
    }

    const seconds = differenceInSeconds(date1, date2)
    // console.log("111 ~ seconds:", seconds)
    if (seconds) {
        return `${seconds}s`
    }

    return '0s'
}