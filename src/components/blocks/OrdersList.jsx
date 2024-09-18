import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from "antd";

import { fetchOrders, sortByTotal } from '../../store/features/items/getOrdersDataSlice';
import OrderCard from "./OrderCard";
import Main from "../../layout/Main";

const OrdersList = () => {
  
  const orders = useSelector((state) => state.getOrdersDataSlice.orders);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleSortClick = (event) => {
    if (event === "2") {
      dispatch(sortByTotal());
    }
    else if (event === "1") {
      dispatch(fetchOrders());
    };
  };

  const tab = [
    {
      key: "1",
      label: 'По статусу',
    },
    {
      key: "2",
      label: 'По стоимости',
    }
  ];

  return (
    <Main>
      <h1 style={{
        fontSize: 32,
        fontWeight: 800,
        textAlign: "center"
      }}>
        Мои заказы
      </h1>
      <div style={{padding: "0 90px 40px"}}>
      <h3 style={{textAlign: "center",
          color: "#C3C3C0",
          paddingTop: 15
        }}>
          Сортировать по:
        </h3>
        
      <Tabs
        defaultActiveKey="1"
        centered
        items={tab}
        onChange={handleSortClick}
      />

        <div style={{display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center"
        }}>
          {
            orders?.map(
              (order) =>
              <OrderCard
                key={order.id}
                props={order}
              />
            )
          }
        </div>
      </div>
    </Main>
  );
};

export default OrdersList;
