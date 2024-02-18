import {Fragment} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'

export default function FlyoutMenu({title, items, collapsed}) {
    return (
        <Popover className="relative">
            <Popover.Button className={`
                inline-flex items-center gap-x-1 font-semibold leading-6 text-gray-900 outline-0
                ${!collapsed ? "text-sm" : "-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50"}
            `}
            >
                <span>{title}</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true"/>
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                    <div
                        className="w-screen max-w-sm flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                        <div className="p-4">
                            {items.map((item) => (
                                <div key={item.name}
                                     className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <div>
                                        <a href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                                            {item.name}
                                            <span className="absolute inset-0"/>
                                        </a>
                                        <p className="mt-1 text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
