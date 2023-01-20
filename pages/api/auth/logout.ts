// import { verify } from "jsonwebtoken"
// import { serialize } from "cookie"
var cookie = require('cookie');
var jwt = require('jsonwebtoken');

export default function logoutHandler(req:any, res:any) {
    const {myTokenName} = req.cookies
    if (!myTokenName) {
        return res.status(401).json({error: 'no token'})
    } 

    try {
        jwt.verify(myTokenName, 'secret')
        const serialized = cookie.serialize('myTokenName', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        })
        res.setHeader('Set-Cookie', serialized)
        return res.status(200).json('logout succesfully')
    } catch (error) {
        return res.status(401).json({error: 'invalid token'})
    }
    
}  