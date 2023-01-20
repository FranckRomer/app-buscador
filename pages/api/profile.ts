// import { verify } from "jsonwebtoken"
var jwt = require('jsonwebtoken');

export default function profileHandler(req:any, res:any) {
    //
    try {
        const { myTokenName } = req.cookies
        if (!myTokenName) {
            return res.status(401).json({error: 'no token'})
        } 
        const user = jwt.verify(myTokenName, 'secret')
        // console.log("🚀 ~ file: profile.js ~ line 7 ~ profileHandler ~ user", user)
        return res.json({
            email: user.email,
            username: user.username
        })
    } catch (error) {
        return res.status(401).json({
            error: 'invalid token'
        })
    }


}