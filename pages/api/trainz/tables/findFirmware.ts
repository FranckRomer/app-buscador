import { FindData } from "../../../../crud/crud"

////////////////////////////////////////////////////////////////
export default async function findDisp(req: any, res: any) {
    let body = req.body
    const clase = body.clase                        //  BIA || CONTADOR ||  GPS
    // const tipo = body.tipo                          // TIEMPO_REAL || STATUS
    const numero_serial = body.numero_serial
    if (clase == undefined || numero_serial == undefined) {
        res.status(401).json("No Found")
    }
    // console.log("--------------------- Consulta de " + clase + " con " + tipo + " ---------------------");
    let proyect = "trainz"
    const collection = clase.toLocaleUpperCase() + "_" + "firmware"
    // let querys: any
    const querys =  { numero_serie: numero_serial }
    
    let result = await FindData(querys, proyect, collection)
    // console.log(result);

    
    // console.log(result);
    res.status(200).json(result)
}