import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";

export interface CreateUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

class UserServices {
    public static genreateHashPassword(password: string, salt: string) {
        return createHmac("sha256", salt).update("password").digest("hex");
    }

    async createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(16).toString("hex");
        const hashedPassword = UserServices.genreateHashPassword(password, salt);

        const user = await prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            },
        });

        return user;
    }

    async getUserToken(email: string, password: string) {
        const user = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const hashedPassword = UserServices.genreateHashPassword(password, user.salt);

        if (hashedPassword !== user.password) {
            throw new Error("Invalid password");
        }

        // generate token
         const token = jwt.sign({ id: user.id }, "akshay", {
                expiresIn: "1d",
            });

        return token;
    }

}

export default new UserServices();