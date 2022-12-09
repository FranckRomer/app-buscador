import React, { useEffect, useState } from 'react'
import Header from '../../components/Headers/header'
import Tables from '../../components/Tables/Show/tables'
import styles from "./trainz.module.css"

const TrainZ = () => {
    const [tablas, setTablas] = useState("bia")

    return (
        <div className={styles.trainZ}>
            <Header tipo="trainz"></Header>
            <main className={styles.main}>
                <h1>Train-Z</h1>

                <section className={styles.selection}>
                    <div onClick={() => setTablas("bia")}>
                        {tablas == "bia" ? <h2>Bia</h2> : <h3>Bia</h3>}
                    </div>
                    <div onClick={() => setTablas("contador")}>
                        {tablas == "contador" ? <h2>Contadores</h2> : <h3>Contadores</h3>}
                    </div>
                    <div onClick={() => setTablas("gps")}>
                        {tablas == "gps" ? <h2>Gps</h2> : <h3>Gps</h3>}
                    </div>
                </section>

                <hr />


                {tablas == "bia" ?
                    <div className={styles.tabla}>
                        <Tables
                            clase="bia"
                            tipo="TIEMPO_REAL"
                        />
                    </div>
                    : ""}
                {tablas == "contador" ?
                    <div className={styles.tabla}>
                        <Tables
                            clase="contador"
                            tipo="TIEMPO_REAL"
                        />
                    </div>
                    : ""}
                {tablas == "gps" ?
                    <div className={styles.tabla}>
                        <Tables
                            clase="gps"
                            tipo="TIEMPO_REAL"
                        />
                    </div>
                    : ""}

            </main>
        </div>
    )
}

export default TrainZ