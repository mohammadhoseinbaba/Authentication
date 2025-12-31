import shoes from "../assets/shoes.jpg"
import { Button } from "../Components/Button"
export function Kpi() {

    const data: { id: number, name: string, image: string }[] = [
        { id: 1, name: "shoes", image: shoes },
        { id: 2, name: "t-shirt", image: shoes },
        { id: 3, name: "cap", image: shoes },
        { id: 4, name: "trausers", image: shoes },
        { id: 5, name: "unterhose", image: shoes },
        { id: 6, name: "cap", image: shoes },
        { id: 7, name: "trausers", image: shoes },
        { id: 9, name: "unterhose", image: shoes },

    ]



    return (
        <div className="border p-5 m-5 overflow-x-auto rounded-lg">
            <div className="flex flex-nowrap gap-4 ">
                {data.map((d) => (
                    <div key={d.id} className="shrink-0 flex flex-col border rounded-lg items-center p-4 w-96">
                        <img src={d.image} className="h-48 w-full object-cover" />
                        <div className="mt-2 font-semibold">{d.name}</div>
                        <Button className="p-2 mt-2 bg-black text-white rounded-lg font-bold cursor-pointer">Buy</Button>
                    </div>
                ))}
            </div>
        </div>

    )
}