import { useParams } from "react-router";
import { SearchInput } from "../SearchInput";
import { ThemeMode } from "../../ThemeMode";

export const Header = () => {
    const username = useParams<{userName:string}>().userName;
    const firstChar = username ? username.charAt(0).toUpperCase() : '';

  return (
    <header className="header h-16">
      <div className="header-wrapper flex justify-between items-center  w-full h-16 px-10 p-4 border-b border-gray-200 ">
        <div className="title-container ">
          <h1 className="title">Novestra Todo</h1>
        </div>
        <div className="search-bar w-2/3 ">
            <SearchInput/>
        </div>
        <div className="profile-container flex items-center gap-4 ">
            <ThemeMode/>
            <div className="profile w-8 h-8 flex justify-center items-center text-xl font-medium rounded-full bg-indigo-300 ">{firstChar}</div>  
        </div>
      </div>
    </header>
  );
};
