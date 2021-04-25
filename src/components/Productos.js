import React, { useEffect, useState } from "react";
import { Table, Space, Modal, notification } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import axios from "axios";
import Boton from "./Boton";
import {
  DeleteOutlined,
  FormOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ModaAccion from "./ModaAccion";

const Productos = (props) => {
  const { rol } = props;

  const [product, setProduct] = useState([]);
  const [visible, setVisible] = useState(false);
  const [bandera, setBandera] = useState(false);
  const [title, setTitle] = useState("");
  const [datos, setDatos] = useState([]);

  const obtenerProductos = async () => {
    const url = "http://localhost:3001/productos";

    const productos = await axios.get(url);
    setProduct(productos.data);
    console.log(productos.data);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const showModal = () => {
    setVisible(true);
    setTitle("Agregar");
  };

  const cancelModal = () => {
    setVisible(false);
    setBandera(false);
  };

  const obtenerDatosEditar = (record) => {
    //console.log(record);
    setVisible(true);
    setTitle("Actualizar");
    setBandera(true);
    setDatos(record);
  };

  //confirmar eliminar registro
  const onConfirm = (record) => {
    console.log(record);
    Modal.confirm({
      title: `Esta seguro de eliminar el producto ${record.nombre} ?`,
      icon: <ExclamationCircleOutlined />,
      content: "Una vez que se elimine no se podra recuperar el registro",
      okText: "Confirmar",
      cancelText: "Cancelar",
      onOk() {
        eliminarProducto(record.id);
      },
      onCancel() {
        notification["info"]({
          message: "Cancelado",
          description: "Operacion cancelado",
        });
      },
    });
  };

  //eliminar producto
  const eliminarProducto = async (uIdProducto) => {
    try {
      const url = `http://localhost:3001/productos/${uIdProducto}`;
      await axios.delete(url);
      obtenerProductos();
      notification["success"]({
        message: "Exito",
        description: "Producto eliminado correctamente",
      });
    } catch (error) {
      notification["error"]({
        message: "Error",
        description: "Ocurrio un error al eliminar",
      });
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      render: (_, record) => <p>{record.nombre}</p>,
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
      render: (_, record) => <p>{`$${record.precio}`}</p>,
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      render: (_, record) => <p>{record.categoria}</p>,
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
      render: (_, record) => <p>{record.descripcion}</p>,
    },
    {
      title: rol === 'admin' ? ('Acciones'):(''),
      dataIndex: rol === 'admin' ? ('acciones'):(''),
      key: rol === 'admin' ? ('acciones'):(''),
      render: (_, record) => {
        return (
            rol === 'admin' ? (
                <>
                    {
                    <Space>
                        <Boton
                        title="Editar"
                        primary="primary"
                        icon={<FormOutlined />}
                        action={() => obtenerDatosEditar(record)}
                        />
                        <Boton
                        title="Eliminar"
                        primary="primary"
                        danger="danger"
                        icon={<DeleteOutlined />}
                        action={() => onConfirm(record)}
                        />
                    </Space>
                    }
                </>
            ):('')
        );
      },
    },
  ];
  return (
    <Contenedor>
      {rol === "admin" ? (
        <ModaAccion
          showModal={showModal}
          visible={visible}
          cancelModal={cancelModal}
          obtenerProductos={obtenerProductos}
          titulo={title}
          bandera={bandera}
          datos={datos}
        />
      ) : (
        ""
      )}
      <Table columns={columns} dataSource={product} />
    </Contenedor>
  );
};

const Contenedor = styled.div`
  padding: 20px;
`;

export default Productos;
