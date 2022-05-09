import { Schema, model, Document } from 'mongoose';


const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'Role is required']
    }
});


RoleSchema.methods.toJSON = function() {
    const { __v, state, ...role } = this.toObject();
    return role;
}

interface IRole extends Document {
    role: string;
}

export const Role = model<IRole>('Role', RoleSchema);