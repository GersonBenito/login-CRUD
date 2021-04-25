import React, { useEffect } from 'react';
import { Modal, Space, Form, Input, notification }from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import Boton from './Boton';
import axios from 'axios';

const ModaAccion = (props) => {
    const { visible, cancelModal, showModal, obtenerProductos, titulo, bandera, datos } = props;
    console.log(datos);
    console.log(bandera);

    const [form] = Form.useForm();
    
    const { TextArea } = Input;

    const postDatos = async(values) =>{
        if(bandera === true){
            try {
                //actualizar procto
                const url = `http://localhost:3001/productos/${datos.id}`;
                await axios.put(url, values);
                notification['success']({
                    message:'Exito',
                    description:'Producto actualizado corectamente'
                })
                obtenerProductos();
                cancelModal();
                form.resetFields();
                console.log('Datos actualizado =>',values);
            } catch (error) {
                notification['error']({
                    message:'Error',
                    description:'Ocurrio un error al actualizar'
                })
            }
        }else{
            //agregar producto
            try {
                const url = 'http://localhost:3001/productos';
                await axios.post(url, values);
                notification['success']({
                    message:'Exito',
                    description:'Producto guardado correctamente'
                });
                obtenerProductos();
                cancelModal();
                form.resetFields();
            } catch (error) {
                notification['error']({
                    message:'Error',
                    description:'Ocurrio un error al enviar los datos'
                });
            }
        }
    }

    useEffect(() =>{

        //cargar datos en el modal editar
        if(bandera === true){
            form.setFieldsValue({
                nombre:datos.nombre,
                precio:datos.precio,
                categoria:datos.categoria,
                descripcion:datos.descripcion
            });
        }else{
            form.resetFields();
        }
    },[bandera])

    return (
        <>
        <Boton title='Agregar' primary='primary' action={()=>showModal()} />
            <Modal
                visible={visible}
                onCancel={cancelModal}
                footer={null}
            >
                <Contenedor>
                    <Title>
                        {
                            bandera === true ? (<p>{`${titulo} Producto`}</p>):(<p>{`${titulo} Producto`}</p>)
                        }
                    </Title>
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={postDatos}
                        //initialValues={bandera === true && datos}
                    >
                        <Form.Item label='Nombre' name='nombre'>
                            <Input />
                        </Form.Item>

                        <Form.Item label='Precio' name='precio' >
                            <Input />
                        </Form.Item>

                        <Form.Item label='Categoria' name='categoria' >
                            <Input />
                        </Form.Item>

                        <Form.Item label='Descripcion' name='descripcion'>
                            <TextArea rows={3} />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Boton title='Cancelar' action={cancelModal} />
                                <Boton title={bandera === true ? (titulo):(titulo)} primary='primary' type='submit' />
                            </Space>
                        </Form.Item>
                    </Form>
                </Contenedor>
            </Modal>
        </>
    )
}

const Contenedor = styled.div`
    padding:10px;
`;

const Title = styled.div`
    p{
        font-size:20px;
        font-weight:600;
        font-family:Arial;
    }
`;


export default ModaAccion
