import React from "react";
import { Container, Logo, LogoutBtn } from '../Index';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Heder() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const navItem = [
        {
            name: 'Home',
            slug: '/',
            active: !authStatus,
        },
        {
            name: 'login',
            slug: '/login',
            active: !authStatus,
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus,
        },
        {
            name: 'All Posts',
            slug: '/all-Posts',
            active: authStatus,
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus,
        }
    ];

    return (
        <header className="bg-gray-800 text-white py-4">
            <Container>
                <nav className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <Link to='/'>
                            <Logo width={100} />
                        </Link>
                    </div>
                    <ul className='flex space-x-4 mi-auto'>
                        {navItem.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='hover:text-gray-400 duration-300 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full '
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}