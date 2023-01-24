import React, { useState } from 'react'
import Header from '../../components/Headers/header'
import Login from '../../components/Login/Login/Login'
import Register from '../../components/Login/Register/Register'
import styles from './LoginPage.module.css'
import Image from 'next/image'

const LoginPage = () => {
    const [statusLogin, setStatusLogin] = useState(true)
    return (
        <>
            <Header tipo="login"></Header>
            <main className={styles.main}>
                {statusLogin ?
                    <div className={styles.selection}>
                        <h1>Inicio de Usuario</h1>
                        <h2 onClick={() => setStatusLogin(false)}>Crear usario</h2>
                    </div>
                    :
                    <div className={styles.selection}>
                        <h2 onClick={() => setStatusLogin(true)}>Inicio de Usuario</h2>
                        <h1>Crear usario</h1>
                    </div>
                }
                <div className={styles.principal}>
                    <div className={styles.img_contain}>
                        {/* <Image
                            src="/logos/Accesa simple.png"
                            alt="Picture of the author"
                            width={400}
                            height={220}
                        /> */}
                        <Image
                            src="/logos/Logo Blanco.png"
                            alt="Picture of the author"
                            width={200}
                            height={120}
                        />
                    </div>
                    <div className={styles.login}>
                        {statusLogin ?
                            <Login></Login>
                            :
                            <Register></Register>
                        }
                    </div>
                </div>
                <section className={styles.recuperar}>
                    <p>Recuperar contraseña: <a href="https://accesa.me/contacto.php">Accesa.me</a></p>                   
                </section>
            </main>
        </>
    )

}

export default LoginPage