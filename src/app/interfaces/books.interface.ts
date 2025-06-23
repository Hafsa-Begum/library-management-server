import { HydratedDocument } from "mongoose";

export interface IBooks {
    title : string,
    author : string,
    genre : 'FICTION' | 'NON_FICTION' |  'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn : string,
    description? : string,
    copies : number,
    available : boolean
}

export interface BookInstanceMethods {
    updateAvailability(): Promise<void>;
}

export type BookDocument = HydratedDocument<IBooks, BookInstanceMethods>;