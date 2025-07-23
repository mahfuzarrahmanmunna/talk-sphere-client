import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const usePageTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        if (path === '/') document.title = 'Home | Talk Sphere';
        if (path == '/login') document.title = 'Login | Talk Sphere';
        if (path == '/register') document.title = 'Register | Talk Sphere';
        if (path == '/forbidden') document.title = 'Forbidden | Talk Sphere';
        if (path == '/membership') document.title = 'Membership | Talk Sphere';

        if (path == '/privacy') document.title = 'Privacy | Talk Sphere';
        if (path == '/about') document.title = 'About Us | Talk Sphere';
        if (path == '/contact') document.title = 'Contact Us | Talk Sphere';
        if (path == '/blog') document.title = 'Blog | Talk Sphere';
        if (path == '/dashboard') document.title = 'Dashboard | Talk Sphere';
        if (path == '/dashboard/add-post') document.title = 'Add Post | Talk Sphere';
        if (path == '/dashboard/my-profile') document.title = 'My profile | Talk Sphere';
        if (path == '/dashboard/my-posts') document.title = 'My Post | Talk Sphere';
        if (path == '/dashboard/manage-users') document.title = 'Manage Users | Talk Sphere';
        if (path == '/dashboard/make-announcement') document.title = 'Make Announcement | Talk Sphere';
        if (path == '/dashboard/admin-profile') document.title = 'Admin Profile | Talk Sphere';
        if (path == '/dashboard/reported-comments') document.title = 'Reported Comment | Talk Sphere';
        if (path.startsWith('/dashboard/comments/')) document.title = 'Comment Reported Page | Talk Sphere';
    }, [location])
};

export default usePageTitle;