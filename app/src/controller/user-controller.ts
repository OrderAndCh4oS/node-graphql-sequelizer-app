import {Request, Response} from 'express';
import {ValidationError} from 'sequelize';
import {hidePasswordHash} from "../service/password-utilities";
import model from "../model";
import errorResponse from "../response/error";
import dataResponse from "../response/data";
import messageResponse from "../response/message";

const passport = require('passport');

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

export const login = (req, res, next) => {
    if (!(req.body.hasOwnProperty('username') && (req.body.hasOwnProperty('password')))) {
        return errorResponse(res, 'Username and Password parameters required in json request')
    }
    passport.authenticate('local', function (err, user, info) {
        if (err) return next(err);
        if (!user) return errorResponse(res, 'Auth failed.', 401);
        user = hidePasswordHash(user);
        req.logIn(user, function (err) {
            if (err) return next(err);
            dataResponse(res, user);
        });
    })(req, res, next)
};


export const logout = (req, res) => {
    req.logout();
    return messageResponse(res, 'Logged out')
};

export const update = (req, res) => {

};
