import Navbar from "../Components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import { Toaster } from "react-hot-toast";

function MainlayOut() {

  return (
    <>
      <Toaster position="top-right"
        reverseOrder={false} />
      <Navbar />
      <Outlet />
      {/* <Footer /> */}

    </>
  )
}

export default MainlayOut