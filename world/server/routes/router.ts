import Router from 'express';
import controller from '../controllers/controller.ts'

const route=Router();

route.get('/api/getNews/:country', controller.getNews)

export default route