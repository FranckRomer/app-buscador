import React from 'react'
import Link from 'next/link'
import styles from "./header.module.css"

const Header = (props: any) => {
    return (
        <div className={styles.header}>
            {/* <div className={styles.logo}>

            </div> */}
            <div className={styles.menus}>
                <Link href={"/"}>
                    {props.tipo == "home" ? <h3>Inicio</h3> : <h4>Inicio</h4>}
                </Link>
                {/* <Link href={"/diagnostico"}>
                {props.tipo == "diagnostico" ? <h3>Diagnostico</h3> : <h4>Diagnostico</h4>}
            </Link> */}
                <Link href={"/trainz"}>
                    {props.tipo == "trainz" ? <h3>TrainZ</h3> : <h4>TrainZ</h4>}
                </Link>
                {/* <Link href={"/contact"}>
                {props.tipo == "contact" ? <h3>Contact</h3> : <h4>Contact</h4>}
            </Link> */}
            </div>
            <div className={styles.login}>
                <Link href={"/login"}>
                    {props.tipo == "login" ? <h3>Login</h3> : <h4>Login</h4>}
                </Link>
                <Link href={"/user"}>
                    {props.tipo == "user" ? <h3>User</h3> : <h4>User</h4>}                    
                </Link>
            </div>
        </div>
    )
}

export default Header