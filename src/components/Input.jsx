export default function Input({title, id, isNumeric}) {
    return (
        <div className="sm:col-span-2">
            <label htmlFor={id} className="block text-sm font-semibold leading-6 text-gray-900">
                {title}
            </label>
            <div className="mt-2.5">
                <input
                    type={`${isNumeric ? "number" : "text"}`}
                    id={id}
                    name={id}
                    autoComplete="none"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    )
}