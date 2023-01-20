import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from './Login.module.css'

const Login = () => {
    const [Credencials, setCredencials] = React.useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(false)

    const router = useRouter()

    const handleChange = (e: any) => {
        setCredencials({
            ...Credencials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log(Credencials)
        try {
            const response = await axios.post('/api/auth/login', Credencials)
            console.log(response)
            if (response.status === 200) {
                router.push('/trainz')
            }
        } catch (error) {
            console.log(error);
            setError(true)

        }

    }
    return (
        <div className={styles.login}>
            {error ?
                <div className={styles.error}>
                    <h2>Error de Inicio</h2>
                    <p>El usuario o contraseña no son correctos</p>
                </div>
                :""
            }
            <form onSubmit={handleSubmit} className={styles.form}>
                <p>Correo:</p>
                <input
                    name='email'
                    type="email"
                    placeholder='email'
                    onChange={handleChange}
                />
                <p>Contraseña:</p>
                <input
                    name='password'
                    type="password"
                    onKeyUp={handleSubmit}
                    placeholder='password'
                    onChange={handleChange}
                />

                <button type="button" onClick={handleSubmit}>Iniciar</button>
            </form>
            {/* <p>hols</p> */}
        </div>
    )
}

export default Login