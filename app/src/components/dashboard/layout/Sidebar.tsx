import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import {
  useAppDispatch,
} from "../../../hooks/redux/reduxHooks";
import { logOut } from "../../../features/auth/authSlice";

export const Sidebar = () => {
  const username = useParams<{ userName: string }>().userName;
  const dispatch = useAppDispatch();
  return (
    <div className="sidebar w-44 h-full border-r border-gray-200">
      <nav className="navigations flex flex-col justify-between gap-4 py-4 px-10 w-full h-full">
        <div className="nav-links flex flex-col gap-4 h-3/4 w-full">
          <NavLink
            to={`/dashboard/${username}/todos`}
            className={({ isActive }) =>
              isActive ? "text-indigo-400" : "hover:text-indigo-300"
            }
          >
            Notes
          </NavLink>
          <NavLink
            to={`/dashboard/${username}/analytics`}
            className={({ isActive }) =>
              isActive ? "text-indigo-400" : "hover:text-indigo-300"
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to={`/dashboard/${username}/bin`}
            className={({ isActive }) =>
              isActive ? "text-indigo-400" : "hover:text-indigo-300"
            }
          >
            Bin
          </NavLink>
          <NavLink
            to={`/dashboard/${username}/settings`}
            className={({ isActive }) =>
              isActive ? "text-indigo-400" : "hover:text-indigo-300"
            }
          >
            Settings
          </NavLink>
        </div>
        <div className="h-1/4 w-full place-content-end">
          <NavLink
            to={`/`}
            className={({ isActive }) =>
              isActive ? "text-indigo-400" : "hover:text-indigo-300"
            }
            onClick={() => dispatch(logOut())}
          >
            Logout
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
