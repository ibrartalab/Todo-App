import { useParams } from 'react-router'
import PersonalDetails from '../../components/dashboard/users/PersonalDetails';

const Settings = () => {
    const username = useParams<{userName:string}>().userName;
    const firstChar = username ? username.charAt(0).toUpperCase() : '';
    const email = username ? `${username.toLowerCase()}@example.com` : '';
  return (
    <div
    className='setting-wrapper w-full h-full py-4'>
        <h1 className="text-lg font-semibold underline text-indigo-500">
            My Account
          </h1>
        <div className="user-profile-icon w-20 h-20 flex justify-center items-center font-medium text-4xl rounded-full bg-indigo-500 text-white mt-4">{firstChar}</div>
        <div className="user-name text-xl font-medium mt-4">{username}</div>
        <div className="user-email text-md font-normal mt-2">{email}</div>
       <PersonalDetails/>
    </div>
  )
}

export default Settings