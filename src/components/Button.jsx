export default function Button({title, type = "button"}) {
    return (
        <div className="mt-10">
            <button
                type={type}
                className="block w-full rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
                {title}
            </button>
        </div>
    )
}