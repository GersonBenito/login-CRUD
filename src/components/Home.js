import React, { useEffect, useState } from 'react';
import { useHistory, useLocation }from 'react-router-dom';
import styled from 'styled-components';
import { Button }from 'antd';
import 'antd/dist/antd.css';
import Cookies from 'universal-cookie';
import Productos from './Productos';

const Home = () => {
    const [usuario, setUsuario] = useState('');
    const [rolUsuario, setRolUsuario] = useState('');
    const history = useHistory();
    const cookies = new Cookies();
    const location = useLocation();

    //uso de useLocation para recuperar datos desde otro componente
    useEffect(() =>{
        let user = location.state.rol;
        console.log('datos de location en el home',user);
        setRolUsuario(user);
    },[])
    //setRolUsuario(location.state.rol);

    const cerrarSesion = () =>{
        cookies.remove('id', {path:"/"});
        cookies.remove('nombre', {path:"/"});
        cookies.remove('apellidos', {path:"/"});
        cookies.remove('username', {path:"/"});
        cookies.remove('rol', {path:"/"});

        history.push('/');
    }
    
    //uso de las cookies para el inicio de sesion y obtener el usuario logeado
    useEffect(() =>{
        setUsuario(`Bienvenido /a ${cookies.get('nombre')} ${cookies.get('apellidos')} /${cookies.get('rol')}`)
    },[])


    //validando la ruta 
    useEffect(() =>{
        if(!cookies.get('id')){
            history.push('/');
        }
    },[cookies])


    return (
        <Contenedor>
            <Usuario>
                <p>{usuario}</p>
                <Button type='primary' onClick={()=>cerrarSesion()}>Cerrar Sesion</Button>
            </Usuario>
            <Productos rol={rolUsuario}/>
        </Contenedor>
    )
}

const Contenedor = styled.div`
    padding:20px;
    p{
        font-weight:600;
        font-size:20px;
    }
`;

const Usuario = styled.div`
    padding:20px;
    display:flex;
    justify-content:space-evenly;
`;

export default Home
