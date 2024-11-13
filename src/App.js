import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signin from './Component/User/Signin/Signin';
import Signup from './Component/User/Signup/Signup';
import Forget from './Component/User/Forget/Forget';
import Reset from './Component/User/Reset/Reset';
import Home from './Component/Home/Home';
import JobPost from './Component/JobPost/JobPost';
import JobDetail from './Component/JobDetail/JobDetail';
import ProfileEdit from './Component/ProfileEdit/ProfileEdit';
import Menu from './Component/Menu/Menu';
import SearchHome from './Component/SearchHome/SearchHome';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Signin/>}/>

      <Route  path="/register" element={<Signup/>}/>

      <Route path="/forget" element={<Forget/>}/>

      <Route  path="/reset/:id/:token" element={<Reset/>}/>

      <Route  path="/home/:token" element={<Home/>}/>

      <Route path="/post/:token" element={<JobPost/>}/>

      <Route path="/detail/:id" element={<JobDetail/>}/>

      <Route path="/profile/:token" element={<ProfileEdit/>}/>

      <Route path="/menu/:token" element={<Menu/>}/>

      <Route path='/search/:keyword' element={<SearchHome/>}/>


     </Routes>
    </div>
  );
}

export default App;
