import {ValidationError} from 'sequelize';
import {Request, Response} from 'express';
import {User} from "../orm/sequelize";
import {hidePasswordHash} from "../service/password-utilities";

export const register = (req: Request, res: Response) => {
    User.create(req.body)
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
    User.scope('withPassword').findOne({where: {username: req.body.username}})
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
