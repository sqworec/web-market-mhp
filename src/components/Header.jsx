import {useState} from 'react'
import {Dialog} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import FlyoutMenu from "./FlyoutMenu";
import categories from "../data/categories"
import {SignedIn, SignedOut} from "@clerk/clerk-react"
import SignInBtn from "./SignInBtn";
import SignOutBtn from "./SignOutBtn";

const navigation = [{name: 'Контакты', href: '/contacts'}, {name: 'О нас', href: '/about'},]
export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (<div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Минскхлебпром</span>
                        <img
                            className="h-8 w-auto"
                            src="https://www.minskhleb.by/upload/logonew3.png"
                            alt="лого"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <FlyoutMenu
                        title="Продукция"
                        items={categories}
                    />
                    {navigation.map((item) => (<a key={item.name} href={item.href}
                                                  className="text-sm font-semibold leading-6 text-gray-900">
                        {item.name}
                    </a>))}
                    <SignedIn>
                        <a href="/products/add"
                           className="text-sm font-semibold leading-6 text-gray-900">
                            Добавить продукцию
                        </a>
                    </SignedIn>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <SignedOut>
                        <SignInBtn/>
                    </SignedOut>
                    <SignedIn>
                        <SignOutBtn/>
                    </SignedIn>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50"/>
                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Минскхлебпром</span>
                            <img
                                className="h-8 w-auto"
                                src="https://www.minskhleb.by/upload/logonew3.png"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Закрыть меню</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <FlyoutMenu
                                    title="Продукция"
                                    items={categories}
                                    collapsed={true}
                                />
                                {navigation.map((item) => (<a
                                    key={item.name}
                                    href={item.href}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    {item.name}
                                </a>))}
                                <SignedIn>
                                    <a href="/products/add"
                                       className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Добавить продукцию
                                    </a>
                                </SignedIn>
                            </div>
                            <div className="py-6">
                                <SignedOut>
                                    <SignInBtn/>
                                </SignedOut>
                                <SignedIn>
                                    <SignOutBtn/>
                                </SignedIn>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    </div>)
}