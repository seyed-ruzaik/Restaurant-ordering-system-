import {BuildOptions, Model} from "sequelize";
import {Request, Response} from "express";

/**
 * create a static type representation of the model
 */
type ModelStatic = typeof Model & (new(values?: object, options?: BuildOptions) => Model);

/**
 * Password Validator
 */
export function isAllPresent(str: string) {
    // Regex to check if a string
    // contains uppercase, lowercase
    // special character & numeric value
    let pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    // If the string is empty
    // then print No
    if (!str || str.length === 0) {
        return false;
    }

    // Print Yes If the string matches
    // with the Regex
    if (pattern.test(str)) {
        return true;
    } else {
        return false;
    }
}

//GET an item
export async function getData (req: Request, res: Response, ModelName: ModelStatic){
    try {
        const data = await ModelName.findAll({
            where: {},
            attributes: {exclude: ["createdAt", "updatedAt"],},
            limit: +req.params.limit,
            offset: +req.params.offset});
        res.status(200).send(data); //send User Roles
    } catch (error) {
        await errorMessage(req, res, error.message);
    }
}

//error message
export async function errorMessage (req: Request,res: Response,msg: string){
    res.status(400).send({message: msg, timestamp: new Date()});
}