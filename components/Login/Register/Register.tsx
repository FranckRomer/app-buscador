import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios'

const Register = () => {
    const [Credencials, setCredencials] = React.useState({
        email: '',
        password: '',
        re_password:'',
        company:'',
    })

    const router = useRouter()

    const handleChange = (e:any) => {
        setCredencials({
            ...Credencials,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e:any) =>{
        e.preventDefault()
        console.log(Credencials)
        const response = await axios.post('/api/auth/login', Credencials)
        console.log(response)

        if (response.status === 200) {
            router.push('/trainz')
        }
    }

    // ?--------------------------
    return (
        <div>
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
                    onKeyUp={handleSubmit}
                />

                
                <button type="button">Crear</button>
            </form>
        </div>
    )
}

export default Register