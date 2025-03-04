import { Outlet } from "react-router";
import Header from "./components/Header";
import AppRouter from "./routes/AppRouter";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div className="flex-col flex">
      <div className="h-14">
        <Header />
 

      </div>
      <div>
        <Outlet />

      </div>



    </div>
  )
}