var cookie = require('cookie');
var jwt = require('jsonwebtoken');
import { FindData } from "../../../crud/crud"

export default async function loginHandler(req:any, res:any) {
    console.log(req.body)
    const { email, password } = req.body
    // check if email and password are valid
    let querys = {"email":email}
    let proyect = "instaladores"
    let collection = "users" 
    let result = await FindData(querys, proyect, collection)
    console.log(result);
    
    // if email exists, check if password is correct
    if (result[0].email !== email) {
        console.log("No hay usario con: " + email);
        return res.status(401).json({error: 'invalid email'})
    }

    // if password is correct

    if (email == result[0].email && password === result[0].password) {
        console.log("!!!!! CONFIRMED  !!!!!")
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),  //seg min hora dia
            email: 'admin@admin.com',
            cargo: result[0].cargo
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