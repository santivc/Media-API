import { User, Role, Media, Type, Category, List } from '../models';


//? VALIDATE USERS
export const existUserById = async (id: string) => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`The user with id (${id}) does not exist`);
    }
}

export const isValidRole = async (role: string) => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`The role (${role}) does not exist`);
    }
}

export const existUserByUsername = async (username: string) => {
    const existUsername = await User.findOne({ username });
    if (existUsername) {
        throw new Error(`The username (${username}) already exists`);
    }
}

export const existUserByEmail = async (email: string) => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`The email (${email}) already exists`);
    }
}

//? VALIDATE MEDIA
export const existMediaById = async (id: string) => {
    const existMedia = await Media.findById(id);
    if (!existMedia) {
        throw new Error(`The media with id (${id}) does not exist`);
    }
}

export const isValidCategory = async (category: string) => {
    const existCategory = await Category.findOne({ category });
    if (!existCategory) {
        throw new Error(`The category (${category}) does not exist`);
    }
}

export const isValidType = async (type: string) => {
    const existType = await Type.findOne({ type });
    if (!existType) {
        throw new Error(`The type (${type}) does not exist`);
    }
}

//? VALIDATE LIST
export const existListById = async (id: string) => {
    const existList = await List.findById(id);
    if (!existList) {
        throw new Error(`The list with id (${id}) does not exist`);
    }
}

export const existListByUser = async (user: string) => {
    const existUsername = await List.findOne({ user });
    if (!existUsername) {
        throw new Error(`The list with user (${user}) does not exist`);
    }
}