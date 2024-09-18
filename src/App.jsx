import { Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPages';
import ItemPage from './pages/ItemPage';

function App() {
  return (
    <>
      <main styles={{padding: "600px"}}>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/product/:id" element={<ItemPage />}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
