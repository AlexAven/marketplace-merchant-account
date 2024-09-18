import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, InputNumber, ConfigProvider, Modal } from 'antd';

import { createAd } from '../../store/features/items/postItemSlice';
import { fetchItems } from '../../store/features/items/itemPageSlice';

const NewItemCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const [componentVariant, setComponentVariant] = useState('filled');
  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };

  const handleSubmit = async ({ name, price, description, imageUrl }) => {
    const newItem = {
      id: new Date().getTime().toString(),
      name,
      description,
      price,
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      imageUrl: imageUrl ?? "",
      count: 1,
    };

    handleOk();
    const resultAction = await dispatch(createAd(newItem));
    if (createAd.fulfilled.match(resultAction)) {
      dispatch(fetchItems());
    }
  };

  return (
    <>
      <div style={{ width: "250px", margin: "0 auto", paddingBottom: "20px" }}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultActiveBg: "#7DD212",
                defaultBg: "#7DD212",
                defaultBorderColor: "#7DD212",
                defaultHoverBg: "#6FC10A",
                defaultHoverBorderColor: "#6FC10A",
                defaultHoverColor: "#ffff",
                defaultColor: "#ffff",
              },
            },
          }}
        >
          <Button style={{ width: "100%" }} type="default" size="large" onClick={showModal}>
            Разместить объявление
          </Button>
  
          <Modal
            title=""
            centered
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            footer={[
              <Button key="back" type="primary" onClick={handleCancel}>
                Отмена
              </Button>,
            ]}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              alignItems:"center"
            }}>
              <h1 style={{
                fontSize: 32,
                fontWeight: 800,
                textAlign: "center",
                padding: "50px 0"
              }}>
                Создание нового объявления
              </h1>
              <Form
                form={form}
                onFinish={handleSubmit}
                {...formItemLayout}
                onValuesChange={onFormVariantChange}
                variant={componentVariant}
                style={{ width: 800 }}
                initialValues={{ variant: componentVariant }}
              >
                <Form.Item
                  options={'outlined'}
                  label="Название объявления"
                  name="name"
                  rules={[
                    { required: true, message: 'Введите название объявления' },
                  ]}
                >
                  <Input placeholder=" Введите название которое увидят пользователи" />
                </Form.Item>
  
                <Form.Item
                  label="Цена"
                  name="price"
                  rules={[
                    { required: true, message: 'Введите корректную цену цифрами' },
                  ]}
                >
                  <InputNumber
                    min={1}
                    placeholder=" Введите стоимость товара в рублях"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
  
                <Form.Item
                  label="Описание товара"
                  name="description"
                  rules={[
                    { required: true, message: 'Кратко опишите товар' },
                  ]}
                >
                  <Input.TextArea placeholder=" Кратко опишите особенности и характеристики товара" />
                </Form.Item>
  
                <Form.Item
                  options={'outlined'}
                  label="Ссылка на фото товара"
                  name="imageUrl"
                  rules={[{ required: false }]}
                >
                  <Input placeholder=" Вставьте сюда url-ссылку на реальное фото товара" />
                </Form.Item>
  
                <Form.Item
                  wrapperCol={{ offset: 6, span: 16 }}
                >
                  <Button htmlType="submit">
                    Опубликовать объявление
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </ConfigProvider>
      </div>
    </>
  );
};

export default NewItemCreate;
