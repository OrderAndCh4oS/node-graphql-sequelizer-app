import {Request, Response} from 'express';
import {ValidationError} from 'sequelize';
import model from '../model';
import dataResponse from '../response/data';
import validationErrorResponse from "../response/validation-error";

export const create = (req: Request, res: Response) => {
    model.task.create(req.body)
        .then(task => {
            req.user.setTasks([task]);
            return dataResponse(res, task);
        })
        .catch(ValidationError, err => {
            validationErrorResponse(res, err);
        });
};

export const list = (req: Request, res: Response) => {
    model.task.findAndCountAll().then(result => {
        return dataResponse(res, result);
    })
};

export const detail = (req: Request, res: Response) => {
    model.task.findById(req.params.id).then(task => {
        return dataResponse(res, task);
    })
};

export const update = (req, res) => {

};
