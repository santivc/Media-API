import { validateToken } from './../middlewares/validate-token';
import { getMedia, getMediaById, createMedia, updateMedia, deleteMedia } from './../controllers/media';
import { Router } from 'express';
import { check } from 'express-validator';
import { haveRole, validateFields } from '../middlewares';
import { existMediaById, isValidCategory, isValidType } from '../helpers/db-validators';

const router = Router();

router.get('/', [
    check('from', 'The value must be of type numeric  [from]').optional().isNumeric(),
    check('limit', 'The value must be of type numeric [limit]').optional().isNumeric(),
    validateFields
], getMedia)

router.get('/:id', [
    check('id', 'It is not a MongoId').isMongoId(),
    check('id').custom(existMediaById),
    validateFields
], getMediaById)

router.post('/', [
    validateToken,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('category').custom(isValidCategory),
    check('type', 'Type is required').not().isEmpty(),
    check('type').custom(isValidType),
    validateFields
], createMedia);

router.put('/:id', [
    validateToken,
    check('id', 'It is not a MongoId').isMongoId(),
    check('id').custom(existMediaById),
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('category').custom(isValidCategory),
    validateFields
], updateMedia)

router.delete('/:id', [
    validateToken,
    haveRole('ADMIN_ROLE'),
    check('id', 'It is not a MongoId').isMongoId(),
    check('id').custom(existMediaById),
    validateFields
], deleteMedia)



export const mediaRoutes = router;