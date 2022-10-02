import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, getUserLogged } from '../utils/network-data';

export function useAuth() {
    const isTokenExist = !!getAccessToken();
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(isTokenExist);

    useEffect(() => {
        if (isTokenExist) {
            const isUserLogged = async () => {
                const { error } = await getUserLogged();
                if (error) {
                    setIsLoggedin(false);
                    navigate('/login');
                    localStorage.removeItem('accessToken');
                }
            };

            isUserLogged();
        }
    }, []);

    return [isLoggedin, setIsLoggedin];
}
