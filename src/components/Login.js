import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification, Alert, Space } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import axios from "axios";
import md5 from 'md5';
import Cookies from 'universal-cookie';

//usando useHistory para redireccionar a la pagina home
import { useHistory } from 'react-router-dom';
import Registro from "./Registro";

const Login = () => {

    const url = 'http://localhost:3001/usuarios';
    const[urlUsuarios, setUrlUsuarios] = useState(url)
    const [datos, setDatos] = useState({});
    const history = useHistory();
    const [mensaje, setMensaje] = useState('');
    const [bandera, setBandera] = useState(false);
    const [visible, setVisible] = useState(false);

    //instancia de Cookies
    const cookies = new Cookies();

  const iniciarSesion = async(values) => {
      try {

        //login
          const response = await axios.get(urlUsuarios, { params: { username:values.username, password: md5(values.password) } });
          if(response.data.length > 0){
              //console.log(response.data);
              //.push(response.data)
              //setDatos(response.data)

              //guardar las variables de incio de sesion
              let respuesta = response.data[0];
              cookies.set('id',respuesta.id, { path:"/" });
              cookies.set('nombre',respuesta.nombre, { path:"/" });
              cookies.set('apellidos',respuesta.apellidos, { path:"/" });
              cookies.set('username',respuesta.username, { path:"/" });
              cookies.set('rol',respuesta.rol, { path:"/" });

              //mensaje de bienvebida
              const data = {
                  id:respuesta.id,
                  nombre:respuesta.nombre,
                  apellidos: respuesta.apellidos,
                  username:respuesta.username,
                  rol:respuesta.rol,
              }
              setDatos(data);
            
              notification['success']({
                  message:'Usuario y contraseña ingresado correctamente',
                  description:`Bienvenido /a ${respuesta.nombre} ${respuesta.apellidos}`,
              })

            }else{
                setMensaje('Usuario o contraseña incorrecto');
                setBandera(true);
          }
      } catch (error) {
          console.log(error);
      }
  };

  //validando la ruta
  useEffect(() =>{
      if(cookies.get('id')){
          history.push('/home',datos);
      }
  },[cookies]);

  //mostrar modal
  const showModal = () =>{
      setVisible(true);
  }

  const cancelModal = () =>{
      setVisible(false);
  }

  return (
    <Contenedor>
      <Title>
        <p>Login</p>
      </Title>
      <LoginContainer>
        <Form
          name="basic"
          onFinish={iniciarSesion}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Ingrese su nombre de usuario",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Ingrese su contraseña",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <MensajeError>
              {
                  bandera === true ? (
                      <Alert message={mensaje} type='error' showIcon/>
                  ):('')
              }
          </MensajeError>
          <Form.Item>
            <Space>
                <Button type="primary" htmlType="submit">
                Iniciar sesion
                </Button>
                <Registro showModal={showModal} visible={visible} cancelModal={cancelModal} />
            </Space>
          </Form.Item>
        </Form>
      </LoginContainer>
    </Contenedor>
  );
};

const Contenedor = styled.div`
  padding: 20px;
  display:flex;
  justify-content:space-evenly;
  flex-direction:column;
  align-content:center;
  flex-wrap:wrap;
`;

const LoginContainer = styled.div`
  width: 50%;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-evenly;

  p {
    font-weight: 600;
    font-size: 20px;
  }
`;

const MensajeError = styled.div`
    padding:20px;
`;

export default Login;
