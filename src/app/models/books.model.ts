import { model, Schema } from "mongoose";
import { BookInstanceMethods, IBooks } from "../interfaces/books.interface";

const bookSchema = new Schema <IBooks, BookInstanceMethods>({
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

bookSchema.method("updateAvailability", function () {
    console.log("Inside save method");
    this.available = this.copies>0;
    return this.save();
})

export const Book = model<IBooks, BookInstanceMethods>("Book", bookSchema);