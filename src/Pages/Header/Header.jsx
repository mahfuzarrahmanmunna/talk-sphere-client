// src/components/Header/Header.jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';

const Header = () => {
    const { data: count = 0 } = useQuery({
        queryKey: ['announcementCount'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/announcements/count');
            return res.data.count;
        }
    });

    return (
        <header className="bg-base-100 shadow px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-primary">TalkSphere</h1>
            <div className="relative">
                <FaBell className="text-xl" />
                {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                        {count}
                    </span>
                )}
            </div>
        </header>
    );
};

export default Header;
