import userModel, { iUser } from '../models/users_model';
import createController from './base_controller';

const usersController = createController<iUser>(userModel);

export default usersController;
