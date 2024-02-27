export const getCookie = (name: string): string => {
    const decoded = decodeURIComponent(document.cookie)
    const cookiesArray = decoded.split('; ')
    let cookieSearchingValue: string = ''
    cookiesArray.forEach(cookie => {
        if(cookie.includes(name)) {
            return cookieSearchingValue = cookie.split('=')[1]
        }
    })
    return cookieSearchingValue
}