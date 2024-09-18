import { Card, Button } from 'antd';

const ItemCard = ({ props, onClick }) => {
  const {
    name,
    price,
    views,
    likes
  } = props;

  return (
  <Card
    style={{
      maxHeight: 350,
      maxWidth:520,
      display: 'flex',
    }}
    hoverable
    onClick={onClick}
  >
    <div style={{
      display: 'flex',
      alignItems: "flex-start",
      gap: 25
    }}>
      <div style={{width: "70%"}}>
        <img
          src={!props?.imageUrl || props?.imageUrl === '' 
            ? 
          "https://yt3.googleusercontent.com/qzdviOhUGtycf4aun9XB5GxT6fAKzennOINCnWZeTSaroLle6H3sHWykq_4whlvqo8PyAiyrKg=s900-c-k-c0x00ffffff-no-rj"
            : 
          props?.imageUrl} alt="item-image"
        />
      </div>

      <div style={{display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: "100%"
      }}>

        <div style={{display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'flex-start'
        }}>

          <h1 style={{fontWeight: 800,
            fontSize: "20px",
            color: "#72BFFB",
            paddingBottom: 15
          }}>
            {name}
          </h1>

          <h3 style={{fontWeight: 800,
            fontSize: "20px",
            paddingBottom: 15}}>
            {price?.toLocaleString('ru-RU')} &#8381;
          </h3>

          <p style={{fontWeight: 800,
            fontSize: 16
          }}>
            Просмотрено: {<span style={{fontWeight: 400}}>{views?.toLocaleString('ru-RU')}</span>}
          </p>

          <p style={{fontWeight: 800,
            fontSize: 16
          }}>
            Понравилось: {<span style={{fontWeight: 400}}>{likes?.toLocaleString('ru-RU')}</span>}
          </p>
        </div>

        <div style={{display: "flex",
          justifyContent: "flex-end"
        }}>
          
          <Button style={{marginTop: 20}} type="primary">
            Заказы
          </Button>
        </div>
      </div>
    </div>
  </Card>
  );
};

export default ItemCard;
