import { MdMenuOpen } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Sidebar({ open, setOpen, menuItems, setListObj }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white shadow-md h-screen p-2 flex flex-col duration-500 bg-blue-600 text-white ${open ? "w-60" : "w-16"
        }`}
    >
      {/* Header */}
      <div className=" px-3 py-2 h-20 flex justify-between items-center">
        <img src="" alt="" />
        <div>
          <MdMenuOpen
            size={34}
            className={` duration-500 cursor-pointer ${!open && " rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* Body */}

      <ul className="flex-1">
        {menuItems.map((item, index) => {
          return (
            <li
              key={index}
              // className="px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group"
              onClick={() => { setListObj({ ...item, current: true }); navigate(item.link); }}
              className={classNames(
                item.current ? 'bg-blue-800 hover:bg-blue-500' : '',
                'block rounded-md px-3 py-2 text-base font-medium',
              ) + "px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group"}            >
              <div>{item.icons}</div>
              <p
                className={`${!open && "w-0 translate-x-24"
                  } duration-500 overflow-hidden`}
              >
                {item.label}
              </p>
              <p
                className={`${open && "hidden"
                  } absolute left-32 shadow-md rounded-md
                 w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16
                `}
              >
                {item.label}
              </p>
            </li>
          );
        })}
      </ul>

      <li
        onClick={() => {
          setListObj({ ...menuItems[4], current: true }); 
          dispatch(logout());
          navigate('/'); }}
        className={
          'block rounded-md px-3 py-2 text-base font-medium'
          + "px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group"}            >
        <div><CiLogout size={30} /></div>
        <p
          className={`${!open && "w-0 translate-x-24"
            } duration-500 overflow-hidden`}
        >
          Logout
        </p>
        <p
          className={`${open && "hidden"
            } absolute left-32 shadow-md rounded-md
                 w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16
                `}
        >
          Logout
        </p>
      </li>

    </nav>
  );
}
