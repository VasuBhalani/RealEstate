import jwt  from 'jsonwebtoken';
const secret = "!)(&%agjwebfgt";

function createToken(user) {
    // console.log("Creating token for user:", user);
    const token = jwt.sign({ user }, secret);
    return token;
}

function verifyToken(token) {
    // console.log("Verifying token:", token);
    try {
        const user = jwt.verify(token, secret);
        return user;
    } catch (err) {
        console.error("Token verification failed:", err);
        throw err;
    }
}

module.exports = { createToken, verifyToken };
