import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { refreshTokenFetch } from "./api";
import "./App.scss";
import {
  Header,
  AboutPage,
  HomePage,
  TicketsPage,
  MyTicketsPage,
} from "./components";
import { getAllTickets } from "./redux/reducers/allTickets";
import { logIn } from "./redux/reducers/user";
import { aboutPath, homePath, myTicketsPath, ticketsPath } from "./routes";
import { ACCESS_TOKEN } from "./utils/constants/localStorage.constants";
import { keepTheme } from "./utils/themes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    keepTheme();

    refreshTokenFetch().then((res) => {
      if (res.error) return localStorage.removeItem("username");

      localStorage.setItem(ACCESS_TOKEN, res.token);
      dispatch(logIn(res.user));
    });

    dispatch(getAllTickets());

    return localStorage.removeItem(ACCESS_TOKEN);
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path={homePath} element={<HomePage />} />
          <Route path={aboutPath} element={<AboutPage />} />
          <Route path={ticketsPath} element={<TicketsPage />} />
          <Route path={myTicketsPath} element={<MyTicketsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
