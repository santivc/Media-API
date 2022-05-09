import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields, haveRole, validateToken } from '../middlewares';
import { existUserById, isValidRole, existUserByEmail, existUserByUsername } from './../helpers/db-validators';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './../controllers/user';



const router = Router();


//? GET USERS
router.get('/', [
    check('from', 'The value must be of type numeric  [from]').optional().isNumeric(),
    check('limit', 'The value must be of type numeric [limit]').optional().isNumeric(),
    validateFields
], getUsers);

//? GET USER BY ID
router.get('/:id', [
    check('id', 'It is not a MongoId').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], getUserById);


//? CREATE USER
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'El password must have at least 6 characters').isLength({ min: 6 }),
    check('username').custom(existUserByUsername),
    check('email').custom(existUserByEmail),
    check('role').optional().custom(isValidRole),
    validateFields
], createUser);

//? UPDATE USER
router.put('/', [
    validateToken,
    check('username').custom(existUserByUsername),
    check('email').custom(existUserByEmail),
    check('rol').custom(isValidRole),
    validateFields
], updateUser);

//? DELETE USER (STATE == FALSE)
router.delete('/', [
    validateToken,
    haveRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'It is not a MongoId').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], deleteUser);


export const userRoutes = router;