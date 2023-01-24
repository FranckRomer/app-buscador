import { FindData, InsertData } from "../../../crud/crud"

export default async function registerNewUser(req:any, res:any) {
    console.log(req.body)
    const { email, password } = req.body
    // check if email and password are valid
    let querys = {"email":email}
    let proyect = "instaladores"
    let collection = "users" 
    let result = await FindData(querys, proyect, collection)
    console.log(result);
    //
    if (result.emial == null) {
        "No existe el usuario"
    }
    // if email exists, check if password is correct
    if (result[0].email !== email ) {
        console.log("Se creo el usario: " + email);
        const result_inset = InsertData(req.body, "instaladores", "users")  
        return res.status(201).json({mesage: 'Usario creado'})
    }
        
    console.log("Ya Existe este usario: " + email);
    return res.status(401).json({error: 'invalid email'})
}