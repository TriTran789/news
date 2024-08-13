import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const createSecrectToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_KEY, { expiresIn: 3 * 24 * 60 * 60})
}

export default createSecrectToken;