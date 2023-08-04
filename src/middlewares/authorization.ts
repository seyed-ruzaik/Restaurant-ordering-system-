import passport from 'passport';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            userId?: JwtPayload['id'];
        }
    }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {

    let token : any = req.headers["authorization"];
    let arr: string[] = [];
    if(!token){
        res.send("Need a token!");
    }else {
        arr =  token.split("Bearer ");
        token = arr[1];
        jwt.verify(token, String(process.env.JWT_SECRET),  (err: Error | null,
                                         decoded: JwtPayload | undefined) => {
            if (err){
                res.status(401).json({ status: "error", code: "unauthorized" });
            }else if (decoded){
                req.userId = decoded.id;
                next();
            }
        });
    }

};

export { verifyJWT }
