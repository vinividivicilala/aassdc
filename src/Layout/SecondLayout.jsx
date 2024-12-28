
import { Outlet } from "react-router-dom"
import SideBar from "../Components/SideBar"


function SecondLayout() {

    return (
        <>
            <div className="pt-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
                    <div className=" hidden sm:block border-r h-screen overflow-y-auto">
                        <SideBar />
                    </div>
                    <div className="sm:col-span-2 md:col-span-4 border-r px-4 h-screen overflow-y-auto">

                        <Outlet />
                    </div>
                    
                </div>
            </div>


            {/* <Footer /> */}
        </>
    )
}

export default SecondLayout