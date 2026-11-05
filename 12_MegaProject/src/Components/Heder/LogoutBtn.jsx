import { useDispatch } from 'react-redux';
import authService from '../../appwrite/Auth';
import { logout } from '../../Store/authSlice';

export default function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <button
            onClick={logoutHandler}
            className='inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-300'
        >
            Logout
        </button>
    );
}