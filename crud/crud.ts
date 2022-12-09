var MongoClient = require('mongodb').MongoClient;
var moment = require('moment');

var url = "mongodb://train:ALAala123,.-@74.208.16.217:28021"

//
export function horaActual() {
    let hoy = moment().utcOffset("-6:00");
    let dia = hoy.date().toString();
    let mes = (hoy.month() + 1).toString();
    let ano = hoy.year().toString();
    let hora = hoy.hours().toString();
    let minuto = hoy.minutes().toString();
    let segundo = hoy.seconds().toString();
    if (mes.length == 1) {
        mes = "0" + mes
    }
    if (dia.length == 1) {
        dia = "0" + dia
    }
    if (minuto.length == 1) {
        minuto = "0" + minuto
    }
    if (hora.length == 1) {
        hora = "0" + hora
    }
    if (segundo.length == 1) {
        segundo = "0" + segundo
    }
    let horaAct = ano + "-" + mes + "-" + dia + " " + hora + ":" + minuto + ":" + segundo
    return horaAct
}


///////////////////////////////////////////////////////////////////////

// FIND 
export async function FindData( query:any, proyect:string, collection:string) {
    
    if (  proyect == "" || collection == "") {
        return false
    } else {
        const db = await MongoClient.connect(url);
        const dbo = db.db(proyect);
        const MyCollection = dbo.collection(collection);
        // console.log(query, proyect, collection);
        let result = await MyCollection.find(query).toArray();        
        db.close();
        return result
    }
}
// INSERT
export async function InsertData(body:object, proyect:string, collection:string) {
    if (  proyect == "" || collection == "") {
        return false
    } else {
        let newvalues = { $set: body };
        const db = await MongoClient.connect(url);
        const dbo = db.db(proyect);
        const MyCollection = dbo.collection(collection);
        let result = await MyCollection.insertOne(body);        
        db.close();
        return result
    }
}

// UPDATE
export async function UpgrateData(body:object, query:object, proyect:string, collection:string) {
    if ( proyect == "" || collection == "") {
        return false
    } else {
        // let query = { "zona": body.zona }
        let newvalues = { $set: body };
        const db = await MongoClient.connect(url);
        const dbo = db.db(proyect);
        const MyCollection = dbo.collection(collection);
        let result = await MyCollection.updateOne(query, newvalues);
        if (result.modifiedCount == 0 && result.upsertedCount == 0 && result.matchedCount == 0 ) {        
            result = await MyCollection.insertOne(body);
        } else {
            //   
        }
        db.close();
        return result
    }
}

// DELETE
export async function DeleteData(query:object, proyect:string, collection:string) {
    if ( query == null || proyect == "" || collection == "") {
        return false
    } else {
        // let query = { "can": body.can, "pin": body.pin }
        const db = await MongoClient.connect(url);
        const dbo = db.db( proyect );
        const MyCollection = dbo.collection(collection);
        const result = await MyCollection.deleteOne(query);
        db.close();
        return result
    }
}
