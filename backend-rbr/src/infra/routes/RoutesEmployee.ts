import { Router } from 'express';
import { getAll,create, getById, update,deleted } from '../controller/employee-controller';
import { validate } from '../middleware/validation-middleware';
import { employeeSchema } from '../validation/employee-validation';

const router = Router();
router.get('/', async (_, res) => {
  res.status(200).json({message:"seja bem vindo"})
});
router.get('/api/employees/:id',getById);
router.delete('/api/employees/:id',deleted);
router.get('/api/employees',getAll);
router.put('/api/employees/:id', validate(employeeSchema),update);
router.post('/api/employees', validate(employeeSchema),create);

export default router;  