import {ValidationError} from 'sequelize';
import {Request, Response} from 'express';
import {hidePasswordHash} from "../service/password-utilities";
import model from "../model";

export const register = (req: Request, res: Response) => {
    model.user.create(req.body)
        .then(user => {
            user = hidePasswordHash(user);
            return res.json(user);
        })
        .catch(ValidationError, err => {
            // Todo: handle ValidationError
            res.json(err);
        });
};

export const login = (req, res) => {
    model.user.scope('withPassword')
        .findOne({where: {username: req.body.username}})
        .then((user) => {
            // @ts-ignore
            if (!user || !user.validPassword(req.body.password, user.password)) {
                res.statusCode = 401;
                return res.json({'error': {'message': 'Incorrect credentials'}});
            }
            user = hidePasswordHash(user);
            // @ts-ignore
            req.session.user = user;
            return res.json(user);
        })
};
