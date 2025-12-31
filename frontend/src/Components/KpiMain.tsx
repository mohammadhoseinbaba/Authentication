import { useState } from "react"
import { Button } from "./Button"
import poster from "../assets/poster.jpg"
import poster3 from "../assets/poster3.jpg"
import poster4 from "../assets/poster4.jpg"

const data: { id: number; name: string; image: string }[] = [
    { id: 1, name: "poster", image: poster },
    { id: 2, name: "poster3", image: poster3 },
    { id: 3, name: "poster4", image: poster4 },
]

export function KpiMain() {
    const [index, setIndex] = useState<number>(0)

    const next = () => {
        setIndex((prev) => Math.min(prev + 1, data.length - 1))
    }

    const prev = () => {
        setIndex((prev) => Math.max(prev - 1, 0))
    }

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
            {/* Image container */}
            <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
                {data.map((d, i) => (
                    <img
                        key={d.id}
                        src={d.image}
                        alt={d.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}
            </div>

            {/* Controllers */}
            <div className="flex items-center gap-4">
                <Button
                    onClick={prev}
                    disabled={index === 0}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Prev
                </Button>

                <Button
                    onClick={next}
                    disabled={index === data.length - 1}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </Button>
            </div>

            {/* Indicators (optional but nice) */}
            <div className="flex gap-2">
                {data.map((_, i) => (
                    <span
                        key={i}
                        className={`h-2 w-2 rounded-full ${i === index ? "bg-blue-600" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
