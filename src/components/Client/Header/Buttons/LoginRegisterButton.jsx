import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function LoginRegisterButton() {
  const user = useSelector((state) => state.user.user)
  const navigate=useNavigate()
  const dispatch = useDispatch()
  return (
    <button onClick={()=> {{user?dispatch(logout()):''}; navigate('/');} } className="h-12 bg-buttonBgColor place-items-center rounded-full flex p-4 focus:outline-none duration-300 hover:opacity-70">
      <i className="fa-regular fa-user" />
      <a className="hidden md:block text-sm transition-all duration-1000">
        {user ? "Logout" : "Login/Register"}
      </a>

    </button>
  );
}
