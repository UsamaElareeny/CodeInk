import Header from "../../components/Admin/Header"
import SideBar from "../../components/Admin/SideBar"
import { useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { TbBrandProducthunt } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { Outlet } from "react-router-dom";

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
}

const userNavigation = [
  { name: 'Your Profile', href: 'allproducts' },
  { name: 'Settings', href: '/admin/settings' },
  { name: 'Sign out', href: '/' },
]

const menuItems = [
  {
    icons: <MdOutlineDashboard size={30} />,
    label: "Dashboard",
    link:"/admin",
    current: false
  },
  {
    icons: <TbBrandProducthunt size={30} />,
    label: "Products",
    link:"/admin/products",
    current: false
  },
  
  {
    icons: <IoLogoBuffer size={30} />,
    label: "Category",
    link:"/admin/category",
    current: false
  },
  {
    icons: <FaShoppingCart size={30} />,
    label: "Order",
    link:"/admin/order",
    current: false
  },
  {
    icons: <CiSettings size={30} />,
    label: "Settings",
    link:"/admin/settings",
    current: false
  }
];

export default function DashBoard() {
  const [open, setOpen] = useState(true)
  const [list,setList]=useState(menuItems)
  // const navigate= useNavigate();
  function setListObj(obj){
    setList(list.map(i=>{
      if(i.label===obj.label){
        i.current=obj.current;
      }else if(i.current===true){
        i.current=false;
      }
      return i;
    }));
  }
  return (
    <>
      <div className="min-h-full flex">
        <SideBar open={open} setOpen={setOpen} menuItems={list} setListObj={setListObj}/>
        <main className= {open?" flex-grow ml-[235px] p-2 overflow-y-auto":" flex-grow ml-[60px] p-2 overflow-y-auto "}>
          <Header navigation={list.filter(x => x.current)} userNavigation={userNavigation} user={user} />
          <div className="mx-auto py-3">
            <Outlet />
             </div>
        </main>
      </div>
    </>
  )
}
