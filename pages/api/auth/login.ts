// import jwt from "jsonwebtoken"
// import { serialize } from "cookie"
var cookie = require('cookie');
var jwt = require('jsonwebtoken');

export default function loginHandler(req:any, res:any) {
    console.log(req.body)
    const { email, password } = req.body
    // check if email and password are valid

    // if email exists, check if password is correct
    
    // if password is correct

    if (email == 'admin@admin.com' && password === 'admin') {
        console.log("!!!!! CONFIRMED  !!!!!")
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),  //seg min hora dia
            email: 'admin@admin.com',
            username: 'franck'
        }, 'secret')

        const serialized = cookie.serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })

        res.setHeader('Set-Cookie', serialized)
        return res.json('login succesfully')
    } 

    return res.status(401).json({error: 'invalid email or password'})


}