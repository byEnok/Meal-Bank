
# UserHelper DB functions from Ebuy project
const bcrypt = require("bcrypt")
import { cookies } from "next/headers";
import prisma from "./client";


async function createUser(username, password) {

    try {
        // Create password hash
        const pHash = await bcrypt.hash(password, 10)

        // Create user token
        const userToken = await bcrypt.hash(username, 10)
    
        // Check if a user with that username already exists
        const existingUser = await prisma.user.findUnique({
            where: {username: username.toLowerCase()}
        })
        if (existingUser) return {success: false, message: "User already registered!"}

        // Create a new user in supabase
        const user = await prisma.user.create({
            data: {userToken: userToken,
                   username: username.toLowerCase(),
                   passwordHash: pHash,
            }
        })

        return {success: true, message: "User Created!"}

    } catch (error) {
        console.log(error)
        return {success: false, message: "User creation failed!"}
    }

}

async function loginUser(username, password) {
    try {
        // Attempt to find user with username in db
        const user = await prisma.user.findUnique({
            where: {username: username.toLowerCase()}
        })

        if (!user) return {success: false, message: "User Not Found!"}

        const match = await bcrypt.compare(password, user.passwordHash)
        if (match) {
            cookies().set("userToken", user.userToken, {expires: Date.now() + (1000 * 60 * 60 * 24)})
            return {success: true, message: user.userToken}
        } else {
            return {success: false, message: "Incorrect Password!"}
        }


    } catch (error) {
        return {success: false, message: "User login failed!"}
    }
}








const userDB = {
    createUser,
    loginUser,
}

export default userDB