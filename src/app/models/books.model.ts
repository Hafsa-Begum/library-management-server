import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";

const bookSchema = new Schema <IBooks>({
    title : { type: String, required: true, trim: true },
    author : { type: String, required: true, trim: true },
    genre : {
        type: String,
        uppercase: true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },
    isbn : { type: String, required: true, trim: true, unique: true },
    description : { type: String, default: '' },
    copies : {type: Number, required: true, min: [0, 'Available book must be positive number, got {VALUE}']},
    available : { type: Boolean, default: true}
}, {
    versionKey: false,
    timestamps: true,
});

bookSchema.post("find", function ( doc) {
    console.log("Inside post find hook", doc);
    
})

export const Book = model<IBooks>("Book", bookSchema);