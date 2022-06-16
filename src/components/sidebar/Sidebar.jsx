import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Home',
        icon: <i className='bx bx-home'></i>,
        to: '/',
        section: ''
    },
    {
        display: 'About Us',
        icon: <i className='bx bx-star'></i>,
        to: '/Admin/AboutUs/edit',
        section: 'AboutUs'
    },
    {
        display: 'Properties',
        icon: <i className='bx bx-building-house'></i>,
        to: '/Admin/ForSaleProperties',
        section: 'Property'
    },
    {
        display: 'For Sale Properties',
        icon: <i className='bx bx-chevrons-right'></i>,
        to: '/Admin/ForSaleProperties',
        section: 'Property'
    },
    {
        display: 'For Rent Properties',
        icon: <i className='bx bx-chevrons-right'></i>,
        to: '/Admin/ForRentProperties',
        section: 'Property'
    },
    {
        display: 'Pending Requests',
        icon: <i className='bx bx-chevrons-right'></i>,
        to: '/Admin/SubmittedPropertyRequests',
        section: 'Property'
    },
    {
        display: 'Team Members',
        icon: <i className='bx bx-group'></i>,
        to: '/Admin/TeamMembers',
        section: 'Team Members'
    },
    {
        display: 'Contact Information',
        icon: <i className='bx bx-phone'></i>,
        to: '/Admin/ContactUs/edit',
        section: 'ContactUs'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            Dashboard
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;
