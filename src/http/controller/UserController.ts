import {Request, Response} from 'express';
import User from "../../database/models/User";

export default class UserController {

    /**
     * Show all users
     * @method GET
     * @param {Request} req
     * @param {Response} res
     * @return void
     */
    public static index(req: Request, res: Response): void {
        User.findAll().then(users => {
            res.status(200).send({
                message: `All user`,
                users,
            });
        });
    }

    /**
     * Show user according by hid id and the id parameter
     * @method GET
     * @param {Request} req
     * @param {Response} res
     * @return void
     */
    public static show(req: Request, res: Response): void {
        User.findById(req.params.id).then(user => res.status(200).send(user));
    }

    /**
     * Save a new user
     * @method POST
     * @param {Request} req
     * @param {Response} res
     * @return void
     */
    public static add(req: Request, res: Response): void {
        const data = req.body;

        // Create User
        User.create(data).then(() => {
            res.status(200).send({
                message: `User was successfully added !`,
                data,
            });
        });
    }

    /**
     * Update user
     * @method PUT
     * @param {Request} req
     * @param {Response} res
     * @return void
     */
    public static update(req: Request, res: Response): void {
        const data = req.body;
        User.findById(req.params.id).then(user => {
            if (user == null) {
                return res.status(200).send({
                    message: `User ${req.params.id} was not found !`,
                    data
                });
            }
            return user.update(data).then(() => {
                res.status(200).send({
                    message: `User ${req.params.id} was successfully updated !`,
                    user,
                    data
                });
            });
        });
    }


    /**
     * Delete user
     * @method DELETE
     * @param {Request} req
     * @param {Response} res
     * @return void
     */
    public static delete(req: Request, res: Response): void {
        User.findById(req.params.id).then(user => {
            if (user == null) {
                return res.status(200).send({
                    message: `User ${req.params.id} was not found !`,
                });
            }
            return user.destroy().then(() => {
                res.status(200).send({
                    message: `User ${req.params.id} was successfully deleted !`
                })
            });
        })
    }

}