import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import Header from '../components/Headers/header'

export default function Home() {
  const [equipo, setEquipo] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    obtenerDatos()
  })

  const obtenerDatos = async () => {

    const data = await fetch('http://74.208.233.208:3001/api/v1/camaras')
    const users = await data.json()
    // console.log(users.tiempoReal)

    // console.log(users.tiempoReal.time.substring(3, 20));

    setEquipo(users.tiempoReal)

  }


  ///
  // buscar
  const onSearchValueChange = (event: any) => {
    console.log(event.target.value.toLowerCase())
    setSearchValue(event.target.value.toLowerCase())
  }
  const filteredData = equipo.filter((el: any) => {
    //if no input the return the original
    if (searchValue === '') {
      return el;
    }
    //return the item which contains the user input
    else {
      // console.log(el.element);
      try {
        return el.unidad.toLowerCase().includes(searchValue) || el.terid.toLowerCase().includes(searchValue)
      } catch (error) {
        return el.terid.toLowerCase().includes(searchValue)
      }

    }
  })

  // console.log(filteredData);
  return (
    <div className={styles.container}>
      <Head>
        <title>Buscador</title>
        <meta name="Buscador" content="Visualizador de Rutas para Accesa" />
        <link rel="icon" href="/icons/autobus.png" />
      </Head>
      <Header tipo="home"></Header>
      <main className={styles.main}>
        <h2>Registros Totales: {equipo.length}</h2>
        <div className={styles.buscador}>
          <h3>Buscar:</h3>
          <input
            type="input" placeholder="Unidad o Terid" name="name" id='name' required
            value={searchValue}
            onChange={onSearchValueChange}
          />
        </div>
        

        {filteredData.length === 0 ? <h1>No hay datos con: {searchValue} </h1> : ""}

        { filteredData.length !== 0 ?
          <div className={styles.tabla}>
            <table>
              <thead>
                <tr>
                  <td className="td1">Unidad</td>
                  <td className="td2">Terid</td>
                  <td className="td3">Alcancia</td>
                  <td className="td4">Contador Delantero</td>
                  <td className="td5">Contador Trasero</td>
                  <td className="td6">Status Servidor</td>
                  <td className="td7">Status Alcancia</td>
                  <td className="td8">Status Delantero</td>
                  <td className="td9">Status Trasero</td>
                  <td className="td10">Fecha de último Registro</td>
                </tr>
              </thead>
              <tbody>

                {
                  filteredData.map((item: any, index) => (
                    <tr key={index}>
                      <td className="tdm1">{item.unidad ? item.unidad : "❌"}</td>
                      <td className="tdm2">{item.terid}</td>
                      <td className="tdm3">{item.key_alcancia ? "✅" : "❌"}</td>
                      <td className="tdm4">{item.key_contador1 ? "✅" : "❌"}</td>
                      <td className="tdm5">{item.key_contador2 ? "✅" : "❌"}</td>

                      <td className="tdm6">{item.hearbit_servidor ? "🆗" : "⛔"}</td>
                      <td className="tdm7">{item.hearbit_alcancia ? "🆗" : "⛔"}</td>
                      <td className="tdm8">{item.hearbit_contador1 ? "🆗" : "⛔"}</td>
                      <td className="tdm9">{item.hearbit_contador2 ? "🆗" : "⛔"}</td>


                      <td className="tdm10">{item.time ? item.time.substring(3, 25) : "❌"}</td>

                    </tr>
                  ))
                }


              </tbody>
            </table>
          </div>
        :""}
      </main>

      <footer className={styles.footer}>
        Create by <b>FranckRomer</b>
      </footer>
    </div>
  )
}
