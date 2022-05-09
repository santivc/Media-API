import { Schema, model, Document } from 'mongoose';


const MediaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    type: {
        type: String,
        required: [true, 'Type is required']
    }, 
    platform: [{
        type: String,
    }],
    img: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true
    }
});


MediaSchema.methods.toJSON = function() {
    const { __v, state, ...media } = this.toObject();
    return media;
}

interface IMedia extends Document {
    name: string;
    description: string;
    category: string;
    type: string;
    platform: string;
    img: string;
    state: boolean;
}


export const Media = model<IMedia>('Media', MediaSchema);