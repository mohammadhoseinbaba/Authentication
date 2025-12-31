import { useNavigate } from "react-router-dom"
import { Kpi } from "../Components/KPI"
import { KpiMain } from "../Components/KpiMain"

export default function Dashboard() {
    const navigate = useNavigate()
    return (
        <>
            <nav className=" w-full bg-black py-4 " >
                <div className="flex mx-auto items-center justify-between">
                    {/*LeftSide*/}
                    <div className=" text-white font-bold ml-5" >
                        Shop
                    </div>

                    {/*search bar*/}
                    <div className="">
                        <input className="px-65 py-2 bg-white rounded-lg outline-none"placeholder="What do you think about?" type="text" />
                    </div>

                    {/*rightside*/}
                    <div className="flex gap-4 flex-row-reverse mr-5 ">
                        <button className="bg-sky-500 text-white px-7 py-2 rounded-lg hover:bg-sky-800 font-bold cursor-pointer " onClick={() => navigate("/login")}>Login</button>
                        <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-800 font-bold cursor-pointer" onClick={() => navigate("/signup")}>Sign Up</button>
                    </div>
                </div>
            </nav>

            <div className="mx-auto max-w-md w-full mt-15">
                <KpiMain/>
            </div>

            <Kpi />
        </>
    )
}