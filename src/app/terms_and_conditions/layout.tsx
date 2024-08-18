import Terms from "./page"

 const Layout = () => {
  return (
   <>
   <div className="w-full  h-auto min-h-screen  grid grid-cols-12 my-[4rem] ">
        <div className="col-span-1 3xl:col-span-4"></div>
        <div className="col-span-10 3xl:col-span-4">
            <Terms/>
        </div>
        <div className="col-span-1 3xl:col-span-4"></div>
   </div>
   </>
  )
}

export default Layout