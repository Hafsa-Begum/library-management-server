import { Model, model, Schema } from "mongoose";
import { BookDocument } from "../interfaces/books.interface";

const bookSchema = new Schema <BookDocument>({
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
    this.available = this.copies>0;
    return this.save();
})

export const Book:Model<BookDocument> = model<BookDocument>("Book", bookSchema);