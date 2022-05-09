import { Schema, model, Document } from 'mongoose';


const TypeSchema = new Schema({
    type: {
        type: String,
        required: [true, 'Type is required']
    }
});


TypeSchema.methods.toJSON = function() {
    const { __v, state, ...category } = this.toObject();
    return category;
}

interface IType extends Document {
    type: string;
}

export const Type = model<IType>('Type', TypeSchema);