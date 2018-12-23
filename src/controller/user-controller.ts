import {ValidationError} from 'sequelize';
import {Request, Response} from 'express';
import {User} from "../orm/sequelize";

export const register = (req: Request, res: Response) => {
    User.create(req.body)
        .then(user => {
            return res.json(user);
        })
        .catch(ValidationError, err => {
            // Todo: handle ValidationError
            res.json(err);
        });
};

export const login = (req, res) => {
    return res.json({user: {username: 'name', createdAt: 'A Date'}})
};