import { BrowserRouter, Route, Routes, Router } from "react-router-dom"
import { getuser } from "./fetch/user"
import { useUserData, USER_ACTION } from "./context/userContext"
import { useEffect } from "react";
import Profile from "./page/profile/profile";
import MenuPage from "./page/Menu/MenuPage";
import MusicPage from "./page/Music/Music_Home_Page/MusicPage";
import MusicZingchartPage from "./page/Music/Music_Zingchart_Page/MusicZingchartPage";
import MusicRadioPage from "./page/Music/Music_Radio_Page/MusicRadioPage";
import MusicKhamphaPage from "./page/Music/Music_Khampha_Page/MusicKhamphaPage";
import MusicFollowPage from "./page/Music/Music_Follow_page/MusicFollowPage";
import Signup from "./page/signup/signup";

function App() {
  const [, dispatchUser] = useUserData()

  useEffect(() => {
    let token = window.localStorage.getItem('token')
    token = JSON.parse(token)
    if (token) {
      getuser(token.accessToken)
        .then((rs) => {
          if (rs) {
            dispatchUser({ type: USER_ACTION.SET, payload: rs })
          }
        })
    }
  }, [])


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route index element={<MenuPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/music" >
            <Route index element={<MusicPage />} />
            <Route path="khampha" element={<MusicKhamphaPage />} />
            <Route path="zingchart" element={<MusicZingchartPage />} />
            <Route path="radio" element={<MusicRadioPage />} />
            <Route path="follow" element={<MusicFollowPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;