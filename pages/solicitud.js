import React, { useState, useEffect } from "react";
import { Layout, Table, Button, Modal, Form, Input } from "antd";
import axios from "axios";

const { Item } = Form;


const solicitud = () => {
    const [todas, settodas] = useState();
    const [modal, setModal] = useState({});
    const [updt, setUpdt] = useState({});
    const url = "http://localhost:3000/request/search";
    const fetchApi = async () => {
        const response = await fetch(url);
        //console.log(response.status);
        const responseJson = await response.json();
        settodas(responseJson);
        //console.log(responseJson);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const remove = async (id) => {
        try {
            await fetch(`http://localhost:3000/request/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            settodas(todas.filter(e => e._id !== id))
        }
        catch (e) {
            console.log(e);
        }
    }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk1 = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const crearSolicitudFailed = (error) => {
        console.log("nose envio", error);
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const updtModal = async (datos)=>{
         const res = await axios.patch(`http://localhost:3000/request/${modal._id}`,datos);
           console.log(res.data);
        setIsModalVisible(false);
    }
    const update = async (id) => {
        try {
            const response = await axios(`http://localhost:3000/request/${id}`);
            setModal(response.data)
            console.log(updt);
        }
        catch (e) {
            console.log(e);
        }
        setIsModalVisible(true);
    }

    const columns = [
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Apellidos",
            dataIndex: "lastname",
            key: "lastname",
        },
        {
            title: "Carnet de identidad",
            dataIndex: "dni",
            key: "dni",
        },
        {
            title: "Rol",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Acciones",
            dataIndex: "_id",
            key: "_id",
            render: (_id) => (
                <>
                    {" "}
                    <Button type="primary" onClick={() => update(_id)} >Editar</Button> {"  "}{" "}
                    <Button type="primary" danger onClick={() => remove(_id)}>
                        Eliminar
                    </Button>
                </>
            ),
        },
    ];

    const dataSource = todas;

    return (
        <div>
            <Layout>
                <Modal
                    title="Actualizar Solicitud"
                    visible={isModalVisible}
                    onOk={handleOk1}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Cancelar
                        </Button>,
                    ]}
                >
                    <Form
                        name="fomulario"
                        {...layout}
                        {...modal}
                        onFinish={updtModal}
                        onFinishFailed={crearSolicitudFailed}
                    >
                        <Item
                            label="Nombre"
                            name="name"

                        >
                            <Input placeholder={modal.name} />
                        </Item>

                        <Item
                            label="Apellidos"
                            name="lastname"

                        >
                            <Input placeholder={modal.lastname}></Input>
                        </Item>

                        <Item
                            label="Carnet de Identidad"
                            name="dni"

                        >
                            <Input placeholder={modal.dni}></Input>
                        </Item>

                        <Item
                            label="Rol"
                            name="role"

                        >
                            <Input placeholder={modal.role}></Input>
                        </Item>

                        <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Enviar
                            </Button>
                            ,
                        </Item>
                    </Form>
                </Modal>
                <Table dataSource={dataSource} columns={columns} />
            </Layout>
        </div>
    );
};

export default solicitud;
