import HomeUserComp from "./components/user/HomeUserComp";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import { Route, Routes, useNavigate } from "react-router-dom";
import GameUserDetail from "./components/user/GameUserDetail";
import CategoryUserComp from "./components/user/CategoryUserComp";
import ErrorComp from "./components/ErrorComp";
import CategoryAdmin from "./components/admin/CategoryAdmin";
import Login from "./components/user/Login";
import PersonalUserDetail from "./components/user/PersonalUserDetail"
import GameAdmin from "./components/admin/GameAdmin";
import GameDetail from "./components/admin/GameDetail";
import UpdateGame from "./components/admin/UpdateGame";
import SignUp from "./components/user/SignUp";
import Cart from "./components/user/Cart";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<HomeUserComp/>}></Route>
        <Route path={"/category/:categoryID"} element={<CategoryUserComp/>}></Route>
        <Route path={"/login"} element={<Login/>}></Route>
        <Route path={"/signup"} element={<SignUp/>}></Route>
        <Route path={"/cart"} element={<Cart/>}></Route>
        <Route path={"/game/:id"} element={<GameUserDetail/>}></Route>
        <Route path={"/user/:userId"} element={<PersonalUserDetail/>}></Route>

        <Route path={"/admin/category"} element={<CategoryAdmin/>}/>
        

        <Route path={"/admin/game"} element={<GameAdmin/>}></Route>
        <Route path={"/admin/game/:id"} element={<GameDetail/>}></Route>
        <Route path={"/admin/game/update/:id"} element={<UpdateGame/>}></Route>
        <Route path={"*"} element={<ErrorComp/>}></Route> 
      </Routes>
    </div>
  );
}

export default App;
