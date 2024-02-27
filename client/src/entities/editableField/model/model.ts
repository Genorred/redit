export type fieldType = 'title' | 'text' | 'img'
export type styles = {[key: string | number]: string | number}
export interface FieldInt {
    type: fieldType
    content: string
    styles: styles
}