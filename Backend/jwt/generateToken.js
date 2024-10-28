import jwt from 'jsonwebtoken';

const createTokenandSaveCookie = (userId, res) => {
    // Secret key (you should store this in an environment variable)
    const secretKey = process.env.JWT_SECRET || "yourSecretKey";

    // Create the token with the user ID and expiration time
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '10d' });

    // Set the token in a cookie (cookie settings can be customized as needed)
    res.cookie('jwt', token, {
        httpOnly: true,  // Cookie can't be accessed via JavaScript
        secure: true, // Send cookie over HTTPS only in production
        sameSite: 'Strict', // Protect against CSRF
        // maxAge: 60 * 60 * 1000 // Cookie expires in 1 hour
    });

    // Optionally send a success message or the token in the response body
    // return res.status(200).json({ message: 'Token created and saved in cookie', token });
};

export default createTokenandSaveCookie;
