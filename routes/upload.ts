import { validateExtension } from './../middlewares/validate-file';
import { validateFields } from './../middlewares/validate-data';
import { existCollection } from './../helpers/db-validators';
import { check } from 'express-validator';
import { Router } from 'express';
import { validateFile } from '../middlewares';
import { getFile, uploadFile } from '../controllers/upload';



const router = Router();


router.post('/:collection/:id', [
    validateFile,
    validateExtension,
    check('id', 'It is not a MongoId').isMongoId(),
    check('collection').custom(collection => existCollection(collection, ['user', 'media'])),
    validateFields
], uploadFile);

router.get('/:collection/:id', [
    check('id', 'It is not a MongoId').isMongoId(),
    check('collection').custom(collection => existCollection(collection, ['user', 'media'])),
    validateFields
], getFile)


export const uploadRoutes = router;