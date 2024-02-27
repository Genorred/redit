export interface UserFields {
    name: string,
    password: string
}
export interface UserFormStore {
    name: string,
    password: string,
    setFormState(fields: UserFields): void,
    getFormState(): UserFields
}