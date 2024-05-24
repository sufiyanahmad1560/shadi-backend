import { NextFunction, Request, Response } from "express";
import logger from "../common/logger";



class AuthMiddleware {

    async validateSigninRequestBodyFields(req: Request, res: Response, next: NextFunction) {
        if (req.body && req.body.emailOrUsername && req.body.password) {
            next();
        } else {
            logger.error('While calling API "' + req.originalUrl + '" missing required field');
            res.status(400).send({ error: 'missing required field' })
        }
    }

    async validateSignupRequestBodyFields(req: Request, res: Response, next: NextFunction) {
        if (req.body && req.body.email && req.body.name && req.body.mobile && req.body.password) {
            next();
        } else {
            logger.error('While 100 calling API "' + req.originalUrl + '" missing required field');
            res.status(400).send({ error: 'missing required field' })
        }
    }

}

export default new AuthMiddleware;