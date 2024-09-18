
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Pagination, Button, Space, Dropdown } from "antd";
import { DownOutlined } from '@ant-design/icons';

import SearchBar from "../elements/SearchBar";
import ItemCard from "./ItemCard";
import NewItemCreate from "./NewItemCreate";
import Main from "../../layout/Main";
import { fetchItems, setRenderPage, setFilter } from '../../store/features/items/itemPageSlice';

const ItemsList = () => {
  
  const navigate = useNavigate();
  const onClick = (event) => {
    navigate(`/product/${event}`);
  };

  const dispatch = useDispatch();
  const [selectedSorting, setSelectedSorting] = useState(10);
  const [currentLabel, setCurrentLabel] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = useSelector((state) => state.itemPageSlice.totalItems);
  const renderPage = useSelector((state) => state.itemPageSlice.renderPage);
  const currentRender = useSelector((state) => state.itemPageSlice.currentRender);
  const filter = useSelector((state) => state.itemPageSlice.filter);
  
    useEffect(() => {
      dispatch(fetchItems(selectedSorting));
    }, [dispatch, selectedSorting, currentLabel, currentPage, totalItems, renderPage, filter]);

  const handleSortClick = (event) => {
    if (event === "1") {
      dispatch(setFilter("price"));
    }
    else if (event === "2") {
      dispatch(setFilter("views"));
    }
    else if (event === "3") {
      dispatch(setFilter("likes"));
    };
  };
  
  const tab = [
    {
      key: "1",
      label: 'По цене',
    },
    {
      key: "2",
      label: 'По просмотрам',
    },
    {
      key: "3",
      label: 'По лайкам',
    }
  ];
  
  const items = [
    {
      label: '10',
      key: '10',
    },
    {
      label: 'все',
      key: 'все',
    }
  ];
  
  const handleMenuClick = async (event) => {
    if (event.key !== selectedSorting) {
      if (event.key === '10') {
        await setCurrentLabel('10');
        await setSelectedSorting(10);
      } else {
        await dispatch(setRenderPage(0));
        await setCurrentPage(1);
        await setSelectedSorting(totalItems);
        await setCurrentLabel('все');
      }
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handlePageChange = (newPage) => {
    dispatch(setRenderPage(newPage - 1));
    setCurrentPage(newPage);
    dispatch(fetchItems(selectedSorting));
  };
  
  return (
    <>
      <Main>
      <h1 style={{
        fontSize: 32,
        fontWeight: 800,
        textAlign: "center",
        paddingBottom: 20
      }}>
          Мои объявления
        </h1>
        <div style={{padding: "0 90px 40px"}}>
          <SearchBar />

          <NewItemCreate />

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

          <Dropdown
            Dropdown menu={menuProps}
          >
                <Button>
                  <Space>
                    Отображать по: {currentLabel}
                    <DownOutlined />
                  </Space>
              </Button>
          </Dropdown>
          
          <div style={{display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center"
          }}>
            { 
              currentRender?.map(
                (item) =>
                <ItemCard
                  key={item.id}
                  props={item}
                  onClick={() => onClick(item.id)}
                />
              )
            }
          </div>
        </div>
      </Main>
      <div style={{
        height: 150
      }}>
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          defaultCurrent={1}
          pageSize={selectedSorting}
          total={totalItems}
          align="center"
        />
      </div>
    </>
  );
};

export default ItemsList;
