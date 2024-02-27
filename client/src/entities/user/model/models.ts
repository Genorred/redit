export interface User {
    id: string,
    name: string,
    roles: string[],
    rating: number,
}
export interface UserStore {
    name: string,
    roles: string[],
    rating: number,
    setUser: (user: User)=>void
}