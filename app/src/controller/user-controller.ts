import {ValidationError} from 'sequelize';
import {Request, Response} from 'express';
import {hidePasswordHash} from "../service/password-utilities";
import model from "../model";
import errorResponse from "../response/error";
import statusCode from "../constants/status-code";
import dataResponse from "../response/data";

export const register = (req: Request, res: Response) => {
    model.user.create(req.body)
        .then(user => {
            user = hidePasswordHash(user);
            return dataResponse(res, user);
        })
        .catch(ValidationError, err => {
            // Todo: handle ValidationError <------------------ Use errorResponse to parse validation errors and messages.
            res.json(err);
        });
};

export const login = (req, res) => {
    // Todo: find or create a better way to handle posted json validation. Perhaps a middleware would be better.
    // Note: A middleware could be passed a validation object containing required parameters to check they all exist.
    if (!(req.body.hasOwnProperty('username') && (req.body.hasOwnProperty('password')))) {
        return errorResponse(res, 'Username and Password parameters required in json request')
    }
    model.user.scope('withPassword')
        .findOne({where: {username: req.body.username}})
        .then((user) => {
            // @ts-ignore
            if (!user || !user.validPassword(req.body.password, user.password)) {
                return errorResponse(res, 'Username and Password parameters required in json request', statusCode.UNAUTHORIZED)
            }
            user = hidePasswordHash(user);
            // @ts-ignore
            req.session.user = user;
            return dataResponse(res, user);
        })
};

export const logout = (req, res) => {
    req.session = null;

    return res.json({message: 'Logged out'})
};

export const update = (req, res) => {

};
