import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, Button, ConfigProvider, Modal } from "antd";

import ItemCard from "./ItemCard";

const OrderCard  = ({props}) => {
  const {
    id,
    status,
    createdAt,
    finishedAt,
    total,
    items
  } = props;

  const getDate = (recivedDate) => {
    const date = new Date(recivedDate);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  }; 

    const itemsCounter = (itemsList) => {
      return itemsList.reduce((acc, item) => {
        
        return acc += item.count;
      }, 0);
    };
    
    const [open, setOpen] = useState(false);
    const showModal = () => {
      setOpen(true);
    };

    const handleOk = () => {
      setOpen(false);
    };

    const handleCancel = () => {
      setOpen(false);
    };

    const navigate = useNavigate();
    const onClick = (event) => {
      navigate(`/product/${event}`);
    };

  return (
    <>
      <Card
      style={{
        maxHeight: 450,
        maxWidth: 350,
        border: '2px solid blue',
      }}
      >
        <h1 style={{fontWeight: 800,
          fontSize: "27px",
          color: "#72BFFB",
          paddingBottom: 15}}
        >
          Заказ № {<span style={{color: '#000000'}}>{id}</span>}
        </h1>

        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultActiveBg: "#2D9BF0",
                defaultBg: "#2D9BF0",
                defaultBorderColor: "#2D9BF0",
                defaultHoverBg: "#178BE5",
                defaultHoverBorderColor: "#178BE5",
                defaultHoverColor: "#ffff",
                defaultColor: "#ffff",
              },
            },
          }}
        >
          <Button
          onClick={showModal}
          style={{width: "100%"}} type="default" size="large">
            Показать все товары
          </Button>
        </ConfigProvider> 

        <p style={{fontWeight: 800,
          fontSize: "20px",
          padding: "10px 0"}}>
          Статус: {<span style={{color: "red"}}>{status}</span>}
        </p>

        <p style={{fontWeight: 800,
          fontSize: 17,
          paddingBottom: 5
        }}>
          Дата создания: {<span style={{fontWeight: 400}}>{getDate(createdAt)}</span>}
        </p>

        <p style={{fontWeight: 800,
          fontSize: 17,
          paddingBottom: 5
        }}>
          Общее количетсво товаров: {<span style={{fontWeight: 400}}>{itemsCounter(items)}</span>}
        </p>

        <p style={{fontWeight: 800,
          fontSize: 17,
          paddingBottom: 15
        }}>
          Общая стоимость: {<span style={{fontWeight: 400}}>{total?.toLocaleString('ru-RU')} &#8381;</span>}
        </p>

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
          {
            finishedAt
              && 
            finishedAt !== ''
              ? 
            <Button style={{width: "100%"}} type="default" size="large">
              Завершить заказ
            </Button>
              :
            <Button
              disabled
              style={{width: "100%"}}
              type="default"
              size="large"
            >
              Товар еще не доставлен!
            </Button>
          }
        </ConfigProvider> 

      </Card>
      <Modal
        title=""
        centered
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="back"
            type="primary"
            onClick={handleCancel}
          >
            Назад
          </Button>,
        ]}
      >
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center"
          }}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 800,
            textAlign: "center",
            padding: "50px 0"
          }}>
            Подробности заказа
          </h1>
          {
            items?.map(
              (item) => 
                <ItemCard
                  key={item.id}
                  props={item}
                  onClick={() => onClick(item.id)}
                />
              )
            }
        </div>
      </Modal>
    </>
  );
};

export default OrderCard;
