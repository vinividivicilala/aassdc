import { useLocation, useNavigate } from "react-router-dom"
import SideBar from "../Components/SideBar"



function SearchPage() {
  const location = useLocation();
  const { results } = location.state || {};
  const navigate = useNavigate();
  function handleClick(id) {
    navigate(`/post/${id}`);
  }
  return (
    <>
      <div className="pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
          <div className=" hidden sm:block border-r h-screen overflow-y-auto">
            <SideBar />
          </div>
          <div className="sm:col-span-2 md:col-span-3 border-r h-screen overflow-y-auto">
            <h1 className="text-2xl font-semibold text-gray-700 mb-2 px-4">Search Results</h1>

            <div>
              {
                results && results.length > 0 ? (
                  results.map((post) => (
                    <div key={post.id} className="px-4 pt-3" onClick={() => handleClick(post.id)}>
                      <h1 className="text-lg font-semibold text-blue-500 hover:underline hover:cursor-pointer mb-2">{post.title}</h1>
                      <div className=" py-5 mb-5 border-b border-gray-200 hover:bg-gray-50 transition duration-200 ease-in-out cursor-pointer">
                        <p className="text-gray-700 leading-relaxed">{post.description.slice(0, 200)} <span className="text-blue-500 hover:underline">Read More....</span></p>
                      </div>
                    </div>
                  ))

                ) : (
                  <div className="text-center mt-10">
                    <p className="text-gray-500 text-lg">No posts found</p>
                  </div>

                )
              }
            </div>
          </div>
          <div className="hidden sm:block border-r"> </div>
        </div >
      </div >
    </>
  )
}

export default SearchPage