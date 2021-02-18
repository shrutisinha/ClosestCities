import express from 'express';
// import other routes
import crudRoutes from './crudRoutes';

const router = express.Router();

router.use(crudRoutes)

export default router;