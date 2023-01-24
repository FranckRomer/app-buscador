import { useRouter } from 'next/router'
import React, { useState } from 'react'
import axios from 'axios'
import styles from "../Login/Login.module.css"

const Register = () => {
    const [Credencials, setCredencials] = React.useState({
        email: '',
        password: '',
        re_password:'',
        company:'',
        cargo:''
    })
    const [error, setError] = useState(false)

    const router = useRouter()

    const handleChange = (e:any) => {
        setCredencials({
            ...Credencials,
            [e.target.name]: e.target.value
        })
        setError(false)
    }
    const handleSubmit = async (e:any) =>{
        setError(false)
        e.preventDefault()
        console.log(Credencials)
        if (Credencials.password === Credencials.re_password) {   
            try {
                const response = await axios.post('/api/auth/register', Credencials)
                console.log(response)
        
                if (response.status === 201) {
                    router.push('/login')
                }                
            } catch (error) {
                console.log(error);
                setError(true)                                
            }     
        }
        else{
            setError(true)
        }
    }

    // ?--------------------------
    return (
        <div>
            {error ?
                <div className={styles.error}>
                    <h2>Error de Inicio</h2>
                    <p>El usuario o contraseña no son correctos</p>
                </div>
                : ""
            }
            <form onSubmit={handleSubmit}>
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
                    placeholder='password'
                    onChange={handleChange}
                />
                <p>Repetir contraseña:</p>
                <input
                    name='re_password'
                    type="password"
                    placeholder='password'
                    onChange={handleChange}
                />
                <p>Empresa:</p>
                <input
                    name='company'
                    type="text"
                    placeholder='Compañia'
                    onChange={handleChange}
                />
                <p>Cargo:</p>
                <input
                    name='cargo'
                    type="text"
                    placeholder='Cargo'
                    onChange={handleChange}                    
                    // onKeyUp={handleSubmit}
                />

                
                <button type="button" onClick={handleSubmit}>Crear</button>
            </form>
        </div>
    )
}

export default Register