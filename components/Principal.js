import React, { useState } from "react";
import Link from "next/link";
import {
  Layout,
  Menu,
  Button,
  ConfigProvider,
  Modal,
  Form,
  Input,
  notification,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import es_ES from "antd/lib/locale/es_ES";

const { Header, Content, Footer } = Layout;

const { Item } = Form;
const { Password } = Input;

const Principal = ({ children }) => {
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
  const openNotification = (msg) => {
    notification.open({
      message: 'Notificación',
      description: msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const crearSolicitudOk = async (datos) => {
    try {
      const response = await fetch("http://localhost:3000/request", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });
      const data = await response.json();
      console.log(data);
      setIsModalVisible(false);
      openNotification(data.msg);
      window.location.href = window.location.href;
    } catch (error) {
      console.log(error);
    }
  };

  const crearSolicitudFailed = (error) => {
    console.log("nose envio", error);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div>
      <ConfigProvider locale={es_ES}>
        <Layout>
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item key="1">
                <Link href="/solicitud">Solicitudes</Link>
              </Menu.Item>
            </Menu>
          </Header>

          <Content
            className="site-layout"
            style={{ padding: "0 50px", marginTop: 64 }}
          >
            <Button
              type="primary"
              className="boton-add"
              size="large"
              icon={<UserAddOutlined />}
              onClick={showModal}
            >
              Adicionar solicitud
            </Button>
            <Modal
              title="Crear Solicitud"
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
                onFinish={crearSolicitudOk}
                onFinishFailed={crearSolicitudFailed}
              >
                <Item
                  label="Nombre"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu nombre",
                    },
                  ]}
                >
                  <Input />
                </Item>

                <Item
                  label="Apellidos"
                  name="lastname"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tus apellidos",
                    },
                  ]}
                >
                  <Input />
                </Item>

                <Item
                  label="Carnet de Identidad"
                  name="dni"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu carnet de identidad",
                    },
                  ]}
                >
                  <Input />
                </Item>

                <Item
                  label="Rol"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa Rol",
                    },
                  ]}
                >
                  <Input />
                </Item>

                <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Enviar
                  </Button>
                  ,
                </Item>
              </Form>
            </Modal>
            <br></br>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 380 }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Sistema para la Gestión del Proceso de Certificación de Roles.
          </Footer>
        </Layout>
      </ConfigProvider>
    </div>
  );
};

export default Principal;
