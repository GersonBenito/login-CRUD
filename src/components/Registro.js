import React from 'react';
import { Modal, Space, Form, Input, notification, Select }from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import Boton from "./Boton";
import axios from 'axios';
import md5 from 'md5'

const Registro = (props) => {
    const { showModal, visible, cancelModal } = props;
    const [form] = Form.useForm();

    const { Option } = Select;

    const resgistrarUsuario = async(values) =>{
        try {
            let dataToSend = {
                nombre:values.nombre,
                apellidos:values.apellidos,
                username:values.username,
                password:md5(values.password),//contraseña encriptada
                rol:values.rol,
            }

            console.log(dataToSend);

            const url = 'http://localhost:3001/usuarios';
            await axios.post(url, dataToSend);
            cancelModal();
            form.resetFields();
            notification['success']({
                message:'Existo',
                description:'Resgistrado correctamente'
            })
        } catch (error) {
            notification['error']({
                message:'Error',
                description:'Ocurrio al registrarse'
            })
        }
    }
    return (
        <>
        <Boton title='Registrarse' action={showModal}/>
            <Modal
                visible={visible}
                onCancel={cancelModal}
                footer={null}
            >
                <Contenido>
                    <Title>
                        <p>Registro de usuarios</p>
                    </Title>
                    <Form
                        layout='vertical'
                        onFinish={resgistrarUsuario}
                        form={form}
                    >
                        <Form.Item 
                            label='Nombre' 
                            name='nombre'
                            rules={[
                                {
                                    required:true,
                                    message:'Por favor ingrese su nombre'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item 
                            label='Apellidos' 
                            name='apellidos'
                            rules={[
                                {
                                    required:true, message:'Por favor ingrese sus apellidos'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item 
                            label='Nombre de usuario' 
                            name='username'
                            rules={[
                                {
                                    required:true,
                                    message:'Nombre de usuario obligatorio'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label='Rol de usuario'
                            name='rol'
                            rules={[
                                {
                                    required:true,
                                    message:'Ingrese el rol de usuario'
                                }
                            ]}
                        >
                            <Select>
                                <Option value='admin'>Administrador</Option>
                                <Option value='usuario'>Usuario</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item 
                            label='Contraseña' 
                            name='password'
                            rules={[
                                {
                                    required:true,
                                    message:'Contraseña obligatorio'
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Boton title='Cancelar' action={cancelModal} />
                                <Boton title='Registrarse' primary='primary' type='submit' />
                            </Space>
                        </Form.Item>
                    </Form>
                </Contenido>
            </Modal>
        </>
    )
}

const Contenido = styled.div`
    padding:10px;
`;

const Title = styled.div`
    p{
        font-size:20px;
        font-weight:600;
    }
`;

export default Registro
