import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const Avatar = ({ user, userNavigation }) => {
    const hasImage = user?.imageUrl;

    return (
        <>
            <Menu as="div" className="relative ml-3">
                <div>
                    <MenuButton className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-50 hover:border-blue-500 focus:ring-2 focus:ring-blue-500">
                        {hasImage ? (
                            <img
                                alt="User Avatar"
                                src={user.imageUrl}
                                // onError={(e) => (e.target.src = "/default-avatar.png")} // Fallback image on error
                                className="h-full w-full rounded-full object-cover"
                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zM4 18v1a7 7 0 0014 0v-1"
                                />
                            </svg>
                        )}
                    </MenuButton>
                </div>
                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                            <a
                                href={item.href}
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                            >
                                {item.name}
                            </a>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        </>
    );
};

export default Avatar;
