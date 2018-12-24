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
    User.findOne({where: {username: 'john-boy'}})
        .then((user) => {
            if (!user) {
                throw Error('Not Found');
            }
            // @ts-ignore
            if (!user.validPassword(req.body.password, user.password)) {
                return res.json('Wrong password')
            }

            // @ts-ignore
            req.session.user = user.dataValues;
            return res.json('Logged in, I guess');
        });

};