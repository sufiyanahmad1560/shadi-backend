import { NextFunction, Request, Response } from "express";
import { CustomError } from "../common/errors/custom-error";
import logger from "../common/logger";
import { userService } from "../services/user.service";
import { USER_ROLE } from "../utils/constants";


class AuthController {

    async signup(req: Request, res: Response, next: NextFunction) {
        const { email, name, mobile, password } = req.body;
        try {
            const result = await userService.createUser({ name, email, mobile, password, role: USER_ROLE.USER, resetNonce: false });
            if (result instanceof CustomError || result instanceof Error) {
                next(result);
            } else {
                res.status(200).send(result);
                logger.info('API url "' + req.originalUrl + '" handled successfully!');
            }
        } catch (error) {
            next(error);
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.authenticateUser(req.body);
            if (result instanceof CustomError || result instanceof Error) {
                next(result);
            } else {
                res.status(200).send(result);
                logger.info('API url "' + req.originalUrl + '" handled successfully!');
            }
        } catch (error) {
            next(error);
        }
    }

}

export const authController = new AuthController();