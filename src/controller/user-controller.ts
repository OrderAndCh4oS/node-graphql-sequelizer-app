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
    User.findOne({where: {username: req.body.username}})
        .then((user) => {
            // @ts-ignore
            if (!user || !user.validPassword(req.body.password, user.password)) {
                res.statusCode = 401;
                return res.json({'error': {'message': 'Incorrect credentials'}});
            }
            // @ts-ignore
            req.session.user = user.dataValues;
            return res.json(user);
        })
};