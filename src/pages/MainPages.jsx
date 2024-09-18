import { Tabs } from 'antd';

import OrdersList from '../components/blocks/OrdersList';
import ItemsList from "../components/blocks/ItemsList";

const MainPages = () => {

  const items = [
    {
      key: 1,
      label: 'Мои объявления',
      children: <ItemsList />,
    },
    {
      key: 2,
      label: 'Мои заказы',
      children: <OrdersList />,
    }
  ];

  return(
    <Tabs
      defaultActiveKey="1"
      items={items}
      centered={true}
      size='large'
    />
  );
};

export default MainPages;
