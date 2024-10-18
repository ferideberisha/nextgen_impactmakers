import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Collapse,
} from '@mui/material';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';

const NavBar = ({ theme }) => {
    const NAV_ITEMS = [
        { href: '/', label: 'Home' },
        { href: '/login', label: 'Log In' },
        { href: '/signup', label: 'Sign Up' },
        { href: '/contact', label: 'Contact Us' },
    ];

    let location = useLocation();

    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = (newVal) => () => {
        setMenuOpen(newVal);
    };

    const [categoriesOpen, setCategoriesOpen] = useState(false);

    const handleCategoriesClick = () => {
        setCategoriesOpen(!categoriesOpen);
    };

    const [filtersOpen, setFiltersOpen] = useState(false);

    const handleFiltersClick = () => {
        setFiltersOpen(!filtersOpen);
    };

    const BurgerMenu = (
        <Box
            className={`w-[50%] h-screen flex flex-col fixed sm:hidden top-0 left-0 bg-white text-[#4F1ABE] z-50 ${
                !isMenuOpen ? 'hidden' : ''
            }`}
            role="presentation"
        >
            <List>
                <ListItem disablePadding>
                    <Link
                        to={'/'}
                        className="w-full h-full px-4 py-4 hover:bg-[#A3A9FE80] transition-all"
                    >
                        Home
                    </Link>
                </ListItem>
                <ListItemButton onClick={handleCategoriesClick}>
                    <ListItemText primary="Categories" />
                    {categoriesOpen ? (
                        <MdExpandLess className="scale-150" />
                    ) : (
                        <MdExpandMore className="scale-150" />
                    )}
                </ListItemButton>
                <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem disablePadding>
                            <Link
                                to={'/'}
                                className="w-full h-full pr-4 pl-8 py-4 hover:bg-[#A3A9FE80] transition-all flex flex-row items-center"
                            >
                                <FaCircle className="scale-[0.3] mr-2" />
                                Events
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link
                                to={'/'}
                                className="w-full h-full pr-4 pl-8 py-4 hover:bg-[#A3A9FE80] transition-all flex flex-row items-center"
                            >
                                <FaCircle className="scale-[0.3] mr-2" />
                                Trainings
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link
                                to={'/'}
                                className="w-full h-full pr-4 pl-8 py-4 hover:bg-[#A3A9FE80] transition-all flex flex-row items-center"
                            >
                                <FaCircle className="scale-[0.3] mr-2" />
                                Internships
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link
                                to={'/'}
                                className="w-full h-full pr-4 pl-8 py-4 hover:bg-[#A3A9FE80] transition-all flex flex-row items-center"
                            >
                                <FaCircle className="scale-[0.3] mr-2" />
                                Volunteering
                            </Link>
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem disablePadding>
                    <Link
                        to={'/login'}
                        className="w-full h-full px-4 py-4 hover:bg-[#A3A9FE80] transition-all"
                    >
                        Log In
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link
                        to={'/signup'}
                        className="w-full h-full px-4 py-4 hover:bg-[#A3A9FE80] transition-all"
                    >
                        Sign Up
                    </Link>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <nav
                className="w-full h-20 flex justify-center items-center fixed top-0 left-0 z-50"
                style={
                    theme == 'primary'
                    ? {
                        backgroundImage: 'url(/assets/nav.png)', // Replace with your image path
                        backgroundSize: 'cover', // or 'contain' depending on your needs
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        color: 'white'
                    }
                        : { backgroundColor: '#ffffff', color: 'black' }
                }
            >
                <div className="w-5/6 h-full flex justify-between items-center">
                    <div className="h-full flex items-center">
                        <Link to={'/'}>
                            <img
                                src={
                                    theme == 'primary'
                                        ? '/assets/logo/logo_white.svg'
                                        : '/assets/logo/logo_black.svg'
                                }
                                className="w-[70%] hover:scale-110 transition-all"
                            />
                        </Link>
                    </div>
                    <ul className="flex-row hidden sm:flex">
                        {NAV_ITEMS.map(({ href, label }, index) => {
                            const isActive = location.pathname === href;

                            return (
                                <li key={index}>
                                    <Link
                                        to={href}
                                        className={`ml-8 focus:outline-none ${
                                            isActive ? 'font-semibold' : ''
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <button type="button" className="sm:hidden">
                        {!isMenuOpen ? (
                            <GiHamburgerMenu
                                className="scale-[2]"
                                onClick={toggleMenu(true)}
                            />
                        ) : (
                            <IoMdClose
                                className="scale-[2]"
                                onClick={toggleMenu(false)}
                            />
                        )}
                    </button>
                </div>
            </nav>
            {BurgerMenu}
        </>
    );
};

export default NavBar;
