import './App.css';
import { Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
  <>
  <Routes>
    <Route path='/' element={<ChatPage/>}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path='/register' element={<RegisterPage/>}></Route>
  </Routes>
  </>
  );
}

export default App;
