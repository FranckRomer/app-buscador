import { FindData } from "../../../../crud/crud"

////////////////////////////////////////////////////////////////
export default async function findDisp(req: any, res: any) {
    let body = req.body
    const clase = body.clase                        //  BIA || CONTADOR ||  GPS
    const tipo = body.tipo                          // TIEMPO_REAL || STATUS
    const numero_serial = body.numero_serial
    if (clase == undefined || tipo == undefined) {
        res.status(401).json("No Found") 
    }
    // console.log("--------------------- Consulta de " + clase + " con " + tipo + " ---------------------");
    let proyect = "trainz"
    const collection = clase.toLocaleUpperCase() + "_" + tipo
    let querys: any
    if (numero_serial == undefined) {
        querys = ""
    } else {
        querys = { numero_serie: numero_serial }
    }
    let result = await FindData(querys, proyect, collection)
    // console.log(result);
    
    result = sortJSON(result, 'unidad', 'asc');
    // result = sortJSON(result, 'can', 'asc');
    // console.log(result);
    res.status(200).json(result)
}

// --------------------------------------------------------------------

function sortJSON(data: any, key: string, orden: string) {
    return data.sort(function (a: any, b: any) {
        var x = a[key],
            y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}
