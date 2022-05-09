import { createList, deleteList, updateList } from './../controllers/list';
import { validateToken } from './../middlewares/validate-token';
import { Router } from "express";
import { check } from 'express-validator';
import { getList, getListByIdOrUser } from '../controllers/list';
import { existListById, existListByUser, existUserById } from './../helpers/db-validators';
import { validateFields } from './../middlewares/validate-data';
import { haveRole } from '../middlewares';


const router = Router();


//? GET LIST
router.get('/', [
    check('from', 'The value must be of type numeric  [from]').optional().isNumeric(),
    check('limit', 'The value must be of type numeric [limit]').optional().isNumeric(),
    validateFields
], getList);

//? GET LIST BY ID OR USER
router.get('/:user/:id', [
    check('from', 'The value must be of type numeric  [from]').optional().isNumeric(),
    check('limit', 'The value must be of type numeric [limit]').optional().isNumeric(),
    check('id', 'It is not a MongoId').isMongoId(),
    check('id').custom(existListById),
    check('user', 'It is not a MongoId').isMongoId(),
    check('user').custom(existListByUser),
    validateFields
], getListByIdOrUser);

//? CREATE LIST
router.post('/', [
    validateToken,
    check('name', 'Name is required').not().isEmpty(),
    check('user', 'It is not a MongoId').isMongoId(),
    validateFields
], createList)


//? UPDATE LIST
router.put('/:id', [
    validateToken,
    haveRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'It is not a MongoId').isMongoId(),
    check('id').custom(existListById),
    validateFields
], updateList);

//? DELETE LIST
router.delete('/:id', [
    validateToken,
    haveRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'It is not a MongoId').isMongoId(),
    check('id').custom(existListById),
    validateFields
], deleteList);

export const listRoutes = router;