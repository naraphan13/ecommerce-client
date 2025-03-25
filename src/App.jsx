import { Outlet } from "react-router";
import Header from "./components/Header";
import AppRouter from "./routes/AppRouter";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="flex-col flex">
      <div className="h-14">
        <Header />

    {/* <Home/> */}
      </div>
      <div>
        <Outlet />

      </div>



    </div>
  )
}







// ไอคอนรถเข็น (CartIcon) ควรแสดงจำนวนการแจ้งเตือน

// Toast (แจ้งเตือน) ควรแก้ไขให้แสดงข้อความให้ถูกต้อง ตอนนี้แสดงแค่ "ลงทะเบียนสำเร็จ" ตลอดเวลา
// แอดมินควรสามารถปรับสถานะคำสั่งซื้อได้อย่างอิสระ