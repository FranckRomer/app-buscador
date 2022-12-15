import React, { useState } from 'react'
import Image from 'next/image'
import styles from './ViewDoc.module.css'

const ViewDocument = (props: any) => {
    const [modal, setModal] = useState(false)
    const [newTodoValue, setNewTodoValues] = React.useState(JSON.stringify(props.data,null, 4))


    return (
        <div>
            <section className={styles.Imagen} onClick={() => setModal(true)} >
                <Image
                    src="/icons/ultra-secreto.png"
                    alt="Registro Completo"
                    width={40}
                    height={40}
                />
            </section>
            {modal ?
                <section className={styles.Modal} >
                    <section className={styles.Datos}>
                        <h2>
                            Datos del Registro en Tiempo Real
                        </h2>
                        <textarea
                            placeholder="Espere en la carga de datos, si los datos no llegan reinicie con F5"
                            value={newTodoValue}
                            // onChange={onChange}
                        ></textarea>
                        <div className={styles.boton_Aceptar}>
                            {/* <button className="boton_Add" type="submit" >Añadir</button> */}
                            <button  type="button" onClick={() => setModal(false)}>ACEPTAR</button>
                        </div>
                        {/* <h1>box</h1>
                        <p className={styles.datosjson}>{JSON.stringify(props.data)}</p> */}
                    </section>
                    <div className={styles.Dark} onClick={() => setModal(false)}></div>
                </section>
                : ""}
        </div>
    )
}

export default ViewDocument