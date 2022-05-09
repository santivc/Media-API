import { Schema, model, Document } from 'mongoose';


const UserSchema = new Schema({
    name: {
        type: String,
        required: [ true, 'Name is required' ]
    },
    username: {
        type: String,
        required: [ true, 'Username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [ true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        required: [true, 'Rol is required']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    img: string;
    rol: string;
    state: boolean;
    google: boolean;
}

export const User = model<IUser>('User', UserSchema);