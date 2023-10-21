import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

export const getDateDiffrenceText = (date1: Date, date2: Date) => {
    const days = differenceInDays(date1, date1)
    if (days) {
        return `${days}d`
    }

    const hours = differenceInHours(date1, date1)
    if (hours) {
        return `${hours}h`
    }

    const minutes = differenceInMinutes(date1, date2)
    if (minutes) {
        return `${minutes}min`
    }

    const seconds = differenceInSeconds(date1, date2)
    if (seconds) {
        return `${seconds}s`
    }

    return '0s'
}