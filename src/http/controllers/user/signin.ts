import { generateJwt } from "@/http/middlewares/jwt-validate";
import { makeSigninUseCase } from "@/use-cases/factory/make-signin-use-case";
import { compare } from "bcryptjs";
import {  Request, Response,NextFunction  } from "express";

export async function signin(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;

        const signinUseCase = makeSigninUseCase();

        const user = await signinUseCase.handler(username);

        const doestPasswordMatch = await compare(password, user.password);

        if(!doestPasswordMatch) {
            throw new Error("Invalid credentials");
        }
        const plainUser = {
            id: user.id,
            username: user.username,
        };
        const token = generateJwt(plainUser);
        return res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}