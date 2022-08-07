import Express from 'express';
import { getCategoryListHandler } from '../../../controllers/category.controller';

const router = Express.Router();

router.get('/list', getCategoryListHandler);

export {
    router as CategoryRouter
}