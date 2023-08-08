import { BrowserRouter, Route, Routes } from "react-router-dom"
import { getuser } from "./fetch/user"
import { useUserData, USER_ACTION } from "./context/userContext"
import { useEffect } from "react";
import Profile from "./page/profile/profile";
import MusicPage from "./page/Music/Music_Home_Page/MusicPage";
import MusicZingchartPage from "./page/Music/Music_Zingchart_Page/MusicZingchartPage";
import MusicRadioPage from "./page/Music/Music_Radio_Page/MusicRadioPage";
import MusicKhamphaPage from "./page/Music/Music_Khampha_Page/MusicKhamphaPage";
import MusicFollowPage from "./page/Music/Music_Follow_page/MusicFollowPage";
import Signup from "./page/signup/signup";
import Login from "./page/login/login"
import SongUpload from "./page/songupload/songupload";
import VipPage from "./page/vip/VipPage";

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
            <Route index element={<MusicPage />} />
            <Route path="khampha" element={<MusicKhamphaPage />} />
            <Route path="zingchart" element={<MusicZingchartPage />} />
            <Route path="radio" element={<MusicRadioPage />} />
            <Route path="follow" element={<MusicFollowPage />} />
            <Route path="songupload" element={<SongUpload />} />
            <Route path="vip" element={<VipPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;