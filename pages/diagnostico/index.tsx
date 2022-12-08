import React from 'react'
import Edit from '../../components/Tables/Edit/edit'
import Header from '../../components/Headers/header'
import styles from "../../styles/Home.module.css"

const Diagnostico = () => {
    const [equipo, setEquipo] = React.useState([])
    const [bia, setBia] = React.useState([])
    const [searchValueBia, setSearchValueBia] = React.useState('');
    const [searchValueAll, setSearchValueAll] = React.useState('');

    React.useEffect(() => {
        obtenerDatos()
        obtenerBia()
    })
    // -------------------------------------
    const obtenerDatos = async () => {
        try {
            const data = await fetch('http://74.208.233.208:3001/api/v1/m17')
            const users = await data.json()
            setEquipo(users.tiempoReal)
        } catch (error) {
            console.log(error);
        }
    }
    const obtenerBia = async () => {
        try {
            const data = await fetch('http://74.208.233.208:3001/api/v1/m17/get_bia')
            const users = await data.json()
            setBia(users.tiempoReal)
        } catch (error) {
            console.log(error);
        }
    }
    // -------------------------------------
    // buscar
    const onSearchValueChangeBia = (event: any) => {
        console.log(event.target.value.toLowerCase())
        setSearchValueBia(event.target.value.toLowerCase())
    }
    const filteredDataBia = bia.filter((el: any) => {
        //if no input the return the original
        if (searchValueBia === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            // console.log(el.element);
            return el.conteo.unidad.toLowerCase().includes(searchValueBia)
            // try {
            // } catch (error) {
            //     return el.unidad.toLowerCase().includes(searchValueBia) 
            // }

        }
    })

    // -----------------------------------------------------------------------------------
    return (
        <div>
            <Header tipo="diagnostico"></Header>
            <main className={styles.main}>
                <h1>M17</h1>
                <h2>BIA</h2>
                <h2>Registros Totales: {bia.length}</h2>
                <div className={styles.buscador}>
                    <h3>Buscar:</h3>
                    <input
                        type="input" placeholder="Unidad o Terid" name="name" id='name' required
                        value={searchValueBia}
                        onChange={onSearchValueChangeBia}
                    />
                </div>
                {filteredDataBia.length === 0 ? <h1>No hay unidades de BIA con: {searchValueBia} </h1> : ""}
                {/************************ BIA ************************/}
                <div className="BIA">
                    {filteredDataBia.length !== 0 ?
                        <table >
                            <thead>
                                <td>Unidad</td>
                                <td>Status</td>
                                <td>Conteo Total</td>
                                <td>Dinero Total</td>
                                <td className="td6">Fecha de último Registro</td>
                                <td >Modificar</td>
                            </thead>
                            <tbody>
                                {
                                    filteredDataBia.map((item: any, index) => (
                                        <tr key={index}>
                                            <td className="tdm1">{item.conteo.unidad ? item.conteo.unidad : "❌"}</td>
                                            <td className="tdm1">{item.hearbit ? "✅" : "❌"}</td>
                                            <td className="tdm1">{item.conteo.conteoTotal ? item.conteo.conteoTotal : "❌"}</td>
                                            <td className="tdm1">{item.conteo.dineroTotal ? item.conteo.dineroTotal : "❌"}</td>
                                            <td className="tdm6">{item.conteo.fecha ? item.conteo.fecha : "❌"}</td>
                                            <td><Edit Bia={item.numeroSerie} /></td>
                                        </tr>

                                    ))
                                }

                            </tbody>
                        </table>

                        : ""}
                </div>

                {/************************ CONTADORES ************************/}
                <div className="Contadores">
                    <h2>Registros Totales: {equipo.length}</h2>
                    {
                        <table>
                            <thead>
                                <tr>
                                    <td className="tdp1">Unidad</td>
                                    <td className="tdp2">Servidor</td>
                                    <td className="tdp2">Alcancia</td>
                                    <td className="tdp3">Contador Delantero</td>
                                    <td className="tdp4">Contador Trasero</td>
                                    <td className="tdp5">Fecha de último Registro</td>
                                    <td >Modificar</td>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    equipo.map((item: any, index) => (
                                        <tr key={index}>
                                            <td className="tdmp1">{item.unidad ? item.unidad : "❌"}</td>
                                            <td className="tdmp2">{(item.hearbit_servidor || item.hearbit_contador1 || item.hearbit_contador2) ? "✅" : "❌"}</td>
                                            <td className="tdmp3">{item.hearbit_alcancia ? "✅" : "❌"}</td>
                                            <td className="tdmp3">{item.hearbit_contador1 ? "✅" : "❌"}</td>
                                            <td className="tdmp4">{item.hearbit_contador2 ? "✅" : "❌"}</td>
                                            <td className="tdmp5">{item.time ? item.time.substring(3, 25) : "❌"}</td>
                                            <td><Edit Contador={item.busid} /></td>
                                        </tr>

                                    ))
                                }


                            </tbody>
                        </table>
                    }
                </div>

            </main>
        </div>
    )
}

export default Diagnostico