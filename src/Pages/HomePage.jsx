import SideBar from "../Components/SideBar"
import Posts from "../Components/Posts"


function HomePage() {
  return (
    <>
      <div className="pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
          <div className=" hidden sm:block border-r h-screen overflow-y-auto">
            <SideBar/>
          </div>
          <div className="sm:col-span-2 md:col-span-3 border-r h-screen overflow-y-auto">
          <Posts/>
          
          </div>
          <div className="hidden sm:block border-r"> </div>
        </div>
        </div>
    </>
  )
}

export default HomePage