import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { FormOutlined } from '@ant-design/icons';

import { fetchItem } from "../store/features/items/itemPageSlice";
import { updateItem } from "../store/features/items/updateItemDataSlice";

const ItemPage = () => {
  const { id } = useParams();
  const currentData = useSelector((state) => state.itemPageSlice.currentItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [titleForm] = Form.useForm();
  const [priceForm] = Form.useForm();
  const [descriptionForm] = Form.useForm();
  const [imageForm] = Form.useForm();

  useEffect(() => {
    dispatch(fetchItem(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentData) {
      titleForm.setFieldsValue({ name: currentData.name });
      priceForm.setFieldsValue({ price: currentData.price });
      descriptionForm.setFieldsValue({ description: currentData.description });
      imageForm.setFieldsValue({ imageUrl: currentData.imageUrl });
    }
  }, [currentData, titleForm, priceForm, descriptionForm, imageForm]);

  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleSubmit = async (values) => {
    const updatedData = { ...currentData, ...values };
    const resultAction = await dispatch(updateItem(updatedData));

    if (updateItem.fulfilled.match(resultAction)) {
      dispatch(fetchItem(id));
    }
    closeModal();
  };

  const closeModal = () => {
    titleForm.resetFields();
    priceForm.resetFields();
    descriptionForm.resetFields();
    imageForm.resetFields();
    setIsTitleModalOpen(false);
    setIsPriceModalOpen(false);
    setIsDescriptionModalOpen(false);
    setIsImageModalOpen(false);
  };

  const openModal = (setModalOpen, form) => {
    form.setFieldsValue(currentData);
    setModalOpen(true);
  };

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
  };


  const titleInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const focusInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  useEffect(() => {
    if (isTitleModalOpen) focusInput(titleInputRef);
    if (isPriceModalOpen) focusInput(priceInputRef);
    if (isDescriptionModalOpen) focusInput(descriptionInputRef);
    if (isImageModalOpen) focusInput(imageInputRef);
  }, [isTitleModalOpen, isPriceModalOpen, isDescriptionModalOpen, isImageModalOpen]);

  return (
    <div style={{
      height: "calc(100vh - 238px)",
      display: "flex", flexDirection: "column",
      alignItems: "center",
      gap: 25, padding: "0 100px"
    }}>
      <div>
        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          padding: "40px 0 25px",
          textAlign: "center"
        }}>
          Карточка объявления
        </h1>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <img style={{ maxWidth: 400 }}
            src={!currentData?.imageUrl
              ? "https://yt3.googleusercontent.com/qzdviOhUGtycf4aun9XB5GxT6fAKzennOINCnWZeTSaroLle6H3sHWykq_4whlvqo8PyAiyrKg=s900-c-k-c0x00ffffff-no-rj"
              : currentData?.imageUrl} alt="item"
          />
          <Button onClick={() => openModal(setIsImageModalOpen, imageForm)}
            shape="circle"
            icon={<FormOutlined />}
          />
        </div>
      </div>

      <div style={{
        textAlign: "left",
        fontSize: 25,
        maxWidth: 500
      }}>
        <div style={{
          display: "flex",
          alignItems: "stretch",
          gap: 10
        }}>
          <Button shape="circle"
            icon={<FormOutlined />}
            onClick={() => openModal(setIsTitleModalOpen, titleForm)}
          />
          <p style={{
            paddingBottom: 20,
            fontWeight: 800
          }}>
            Название:&nbsp;
            <span style={{ fontWeight: 400 }}>{currentData?.name}</span>
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "stretch", gap: 10 }}>
          <Button shape="circle"
            icon={<FormOutlined />}
            onClick={() => openModal(setIsPriceModalOpen, priceForm)}
          />
          <p style={{
            paddingBottom: 25,
            fontWeight: 800
          }}>
            Цена:&nbsp;
            <span style={{ fontWeight: 400 }}>
              {currentData?.price.toLocaleString('ru-RU')} &#8381;</span>
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "stretch", gap: 10 }}>
          <Button
            shape="circle"
            icon={<FormOutlined />}
            onClick={() => openModal(setIsDescriptionModalOpen, descriptionForm)}
          />
          <p style={{
            paddingBottom: 25,
            fontWeight: 800
          }}>
            Описание:&nbsp;
            <span style={{ fontWeight: 400 }}>
              {!currentData?.description ? 'без описания' : currentData?.description}
            </span>
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
        <p>
          Просмотрено: {currentData?.views.toLocaleString('ru-RU')}
        </p>
        <p>
          Понравилось: {currentData?.likes.toLocaleString('ru-RU')}
        </p>
        <Button
          type="primary"
          onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>

      <Modal
        title="Название объявления"
        centered
        open={isTitleModalOpen}
        onCancel={closeModal}
        width={1000}
        footer={null}
      >
        <Form form={titleForm} {...formItemLayout} onFinish={handleSubmit}>
          <Form.Item
            label="Название"
            name="name"
            rules={[{ required: true, message: 'Введите название объявления' }]}
          >
            <Input ref={titleInputRef} placeholder="Введите название" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button htmlType="submit">Сохранить изменения</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Цена"
        centered
        open={isPriceModalOpen}
        onCancel={closeModal}
        width={1000}
        footer={null}>
        <Form form={priceForm}
          {...formItemLayout}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Цена"
            name="price"
            rules={[{ required: true, message: 'Введите цену' }]}
          >
            <InputNumber
              ref={priceInputRef}
              min={1}
              placeholder="Введите цену"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button htmlType="submit">Сохранить изменения</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Описание"
        centered
        open={isDescriptionModalOpen}
        onCancel={closeModal}
        width={1000}
        footer={null}
      >
        <Form form={descriptionForm}
          {...formItemLayout}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Описание"
            name="description"
            rules={[{ required: true, message: 'Опишите товар' }]}
          >
            <Input.TextArea
              ref={descriptionInputRef}
              placeholder="Опишите товар"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button htmlType="submit">Сохранить изменения</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Фото товара"
        centered
        open={isImageModalOpen}
        onCancel={closeModal}
        width={1000}
        footer={null}
      >
        <Form form={imageForm}
          {...formItemLayout}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Ссылка на фото" name="imageUrl"
          >
            <Input
            ref={imageInputRef}
            placeholder="Введите URL"
          />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Button
              htmlType="submit">
              Сохранить изменения
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ItemPage;
