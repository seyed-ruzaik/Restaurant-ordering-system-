import {Request, Response} from "express";
import User from "../models/user";
import {isAllPresent} from "../validations/validator";
import bcrypt from "bcrypt";
import {createNewToken} from "./tokenGenerator";

// Set the number of salt rounds for bcrypt
const saltRounds = 10;

/**
 * Auth helper function...
 */
export async function authHelpers(res: Response,req: Request,full_name: string,
                                  email: string, password: string) {
    let status = false;
    try {
        const existingUser = await User.findOne({where: {email: email,},}); //check for an existing user using the email
        if (existingUser) {
            //user already exist error message
            return res.status(400).send({message: "A User With the Same Email Already Exists!"});
        }else {
            if (isAllPresent(password)) {
                    status = true;
            }else { //Error message if Password does not contain an upper,lower,symbol or a number
                if (!isAllPresent(password)) {
                    res.status(400).send({
                        message: "Password should contain an upper," +
                            " lower, symbol and a number"
                    });
                }
            }
        }
        return status;
    } catch (error) {
        /**
         * Error message
         */
        res.status(400).send({error: "Error: " + error.message + "\nTimestamp: " + new Date()});
    }
}


export async function loginHelper (req: Request, res: Response) {
    const {email, password} = req?.body;
    //finding the user using the email
    const user = await User.findOne({where: {email: email},});
    if (!user) {
        res.status(400).send({message: "Incorrect email!"});//error message if user cannot be find
    } else { //checking if password is correct or not using bcrypt.compare method
        await bcrypt.compare(password, <string>user?.password, (error, response) => {
            if (response) {
                try {
                    const token = createNewToken(user);
                    res.send({token: token, userID: user.id, full_name: user.full_name,
                        email: user.email}); //generate token if credentials are correct
                }catch (error) { res.status(400).send({message: error.message});}
            } else {
                res.status(401).send({message: "Password is Incorrect!, " +
                        "Please try again."});//error message if password is incorrect

            }
        });
    }
}
export async function registerHelper (req: Request, res: Response) {
    const {full_name, email, password} = req?.body;
    const helperStatus = await authHelpers(res,req,full_name, email, password);
    if (helperStatus == true) {
        /**
         * Hashing password using 10 saltRounds
         */
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if (password.toString().length > 2) { //Create a new user
            let lowerCaseEmail: string = email.toLowerCase(); //convert the string to lowercase
            try {
                const newUser = await User.create({full_name: full_name.toString().toLowerCase(),
                    email: lowerCaseEmail,
                    password: hashedPassword});
                const token = createNewToken(newUser); //Create token
                res.status(201).send({message: "Account created successfully", token: token}); //success message
            }catch (error) { res.status(400).send({message: error.message});}
        } else {
            if (password.length <= 2) { //Error message if password length is short
                res.status(400).send({message: "Password is short!"});
            }
        }
    }
}

