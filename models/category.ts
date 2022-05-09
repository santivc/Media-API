import { Schema, model, Document } from 'mongoose';


const CategorySchema = new Schema({
    category: {
        type: String,
        required: [true, 'Category is required']
    }
});


CategorySchema.methods.toJSON = function() {
    const { __v, state, ...category } = this.toObject();
    return category;
}

interface ICategory extends Document {
    category: string;
}

export const Category = model<ICategory>('Category', CategorySchema);