export interface IValueStream {
    id?: number;
    title: string;
    description: string;
}

export enum FormMode {
    None,
    CreateNew,
    Edit
}