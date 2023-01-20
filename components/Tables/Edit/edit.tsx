import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../ViewDocument/ViewDoc.module.css'
import axios from 'axios'

const Edit = (props: any) => {
  const [modal, setModal] = useState(false)
  const [newTodoValue, setNewTodoValues] = React.useState(JSON.stringify(props.data, null, 4))
  const [loader, setLoader] = useState(false)
  // useEffect(() => {
  //   obtenerDatos()
  // })

  const obtenerDatos = async () => {
    setLoader(true)
    const parameters = {
      clase: props.data.clase,
      tipo: "firmware",
      numero_serie: props.data.numero_serie
    }
    try {
      const data = await axios.post('/api/trainz/tables/findDisp', parameters)
      setNewTodoValues(JSON.stringify(data.data, null, 4))
      setLoader(false)
      // console.log(data.data);
      setModal(true);
    } catch (error) {
      console.log("NO FUNCIONO");
      setLoader(false)
    }
  }

  //? -------------------------------------------------------------
  const CambiarReg = ()=>{
    console.log("HOla");
    // console.log(newTodoValue);
    //! AQUI VA EL LOGIN  Y LA CONFIRMACION DEL USUARIO
  }
  const onChange = (event:any) =>{
    // Se toman los valores de VALUE y se guardan en la variable
    // console.log(event.target.value)
    setNewTodoValues(event.target.value)
}


  return (
    <div>
      <section className={styles.Imagen} onClick={() => obtenerDatos()}>
        <Image
          src="/icons/big-data.png"
          alt="Registro Completo"
          width={40}
          height={40}
        />
      </section>
      {modal ?
        <section className={styles.Modal} >
          <section className={styles.Datos}>
            <h2>
              Datos del Firmware
            </h2>
            <textarea
              placeholder="Espere en la carga de datos, si los datos no llegan reinicie con F5"
              defaultValue={newTodoValue}
              onChange = {onChange}
            ></textarea>
            <div className={styles.boton_Aceptar}>
              <button className="boton_Add" type="submit" onClick={()=>CambiarReg()}>CAMBIAR</button>
              <button className="boton_Cancel" type="button" onClick={() => setModal(false)}>NO ACTUALIZAR</button>
            </div>
            {/* <h1>box</h1>
                        <p className={styles.datosjson}>{JSON.stringify(props.data)}</p> */}
          </section>
          <div className={styles.Dark} onClick={() => setModal(false)}></div>
        </section>
        : ""}

      {loader ?
        <section className={styles.loader}> <h1></h1></section>  
      : ""}
    </div>
  )
}

export default Edit