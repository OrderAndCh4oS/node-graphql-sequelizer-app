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
    // Todo: Handle error messages to pass tests
    let user = req.user;
    user = hidePasswordHash(user);
    // @ts-ignore
    req.session.user = user;
    return dataResponse(res, user);
};


export const logout = (req, res) => {
    req.session = null;

    return res.json({message: 'Logged out'})
};

export const update = (req, res) => {

};
