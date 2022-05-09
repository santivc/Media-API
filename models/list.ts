import { Schema, model } from 'mongoose';


const ListSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    media: [{
        type: Schema.Types.ObjectId,
        ref: 'Serie'
    }],
    state: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
});


ListSchema.methods.toJSON = function() {
    const { __v, state, ...list } = this.toObject();
    return list;
}

interface IList extends Document {
    name: string;
    series: string [];
    films: string [];
    videogames: string [];
    state: boolean;
    user: string;
}


export const List = model<IList>('List', ListSchema);