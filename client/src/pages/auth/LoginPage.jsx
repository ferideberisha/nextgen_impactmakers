import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IoMdClose } from 'react-icons/io';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [isOrg, setIsOrg] = useState(false);
    const navigate = useNavigate();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState({
        type: 'success',
        heading: 'Success',
        message: '',
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let hasError = false;
        const newErrors = { ...errors };

        if (!loginData.email || !validateEmail(loginData.email)) {
            newErrors.email = true;
            hasError = true;
        }
        if (!loginData.password) {
            newErrors.password = true;
            hasError = true;
        }

        setErrors(newErrors);
        return !hasError;
    };

    const resetData = () => {
        setLoginData({
            email: '',
            password: '',
            rememberMe: false,
            isOrg: false,
        });
    };

    const handleSuccessResponse = (res) => {
        let count = 3;
        setAlertMessage({
            type: 'success',
            heading: 'Success',
            message: `${res.data.message} Redirecting in ${count}`,
        });
        setAlertOpen(true);

        let t1 = setInterval(() => {
            if (count > 0) {
                count--;
                setAlertMessage({
                    type: 'success',
                    heading: 'Success',
                    message: `${res.data.message} Redirecting in ${count}`,
                });
            } else {
                clearTimeout(t1);
                navigate('/');
            }
        }, 1000);

        resetData();
    };

    const handleFailedResponse = (error) => {
        setAlertMessage({
            type: 'error',
            heading: 'Error',
            message:
                error.response?.data.message ||
                'Login failed. Please try again.',
        });
        setAlertOpen(true);
        resetData();
    };

    const handleAlertToggle = () => {
        setAlertOpen(!alertOpen);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#4F1ABE',
            },
        },
    });

    const handleLoginDataChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
        setErrors({ ...errors, [e.target.name]: false });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) return;

        try {
            const response = await axios.post('http://localhost:8080/login', {
                ...loginData,
                rememberMe,
                isOrg,
            });

            if (response.data.success) {
                handleSuccessResponse(response);
            } else {
                console.log(response.data);
                handleFailedResponse();
            }
        } catch (error) {
            handleFailedResponse(error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#4F1ABE]">
                <form className="w-11/12 sm:w-3/5 md:w-3/5 lg:w-2/4 h-auto max-w-md flex flex-col bg-white rounded-lg p-6 justify-center items-center">
                    <div className="w-11/12 sm:w-4/5 md:w-5/6 xl:w-5/6 h-full">
                        <h2 className="text-xl text-black font-bold mt-12 mb-4">
                            Log In
                        </h2>
                        <Box
                            component="div"
                            sx={{
                                '& > :not(style)': { width: '100%', my: '7px' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                type="email"
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                required
                                value={loginData.email || ''}
                                onChange={(e) => handleLoginDataChange(e)}
                                error={!!errors.email}
                                helperText={
                                    errors.email ? 'Email is invalid!' : ''
                                }
                            />
                            <TextField
                                type="password"
                                id="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                required
                                value={loginData.password || ''}
                                onChange={(e) => handleLoginDataChange(e)}
                                error={!!errors.password}
                                helperText={
                                    errors.password ? 'Password is invalid' : ''
                                }
                            />
                        </Box>
                        <div className="w-full h-auto flex justify-between items-center flex-row mb-6">
                            <div className="flex flex-row">
                                <input
                                    type="checkbox"
                                    name="remember_me"
                                    id="remember_me"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(!rememberMe)}
                                    className="mr-2 w-4"
                                />
                                <h1 className="font-medium">Remember Me</h1>
                            </div>

                            <Link to={'/login'} className="font-medium">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Toggle between Participant and Organization */}
                        <div className="w-full flex justify-between mb-4">
                            <button
                                type="button"
                                className={`py-2 px-3 sm:px-6 md:px-8 rounded-md focus:outline-none transition-all duration-300 ${
                                    !isOrg
                                        ? 'bg-[#4F1ABE] text-white'
                                        : 'bg-[#E0E0E0] text-[#4F1ABE] hover:bg-[#C5C5C5]'
                                }`}
                                onClick={(e) => setIsOrg(false)}
                            >
                                Participant
                            </button>
                            <button
                                type="button"
                                className={`py-2 px-3 sm:px-6 md:px-8 rounded-md focus:outline-none transition-all duration-300 ${
                                    isOrg
                                        ? 'bg-[#4F1ABE] text-white'
                                        : 'bg-[#E0E0E0] text-[#4F1ABE] hover:bg-[#C5C5C5]'
                                }`}
                                onClick={(e) => setIsOrg(true)}
                            >
                                Organization
                            </button>
                        </div>

                        <button
                            type="button"
                            className="py-2 px-24 bg-[#4F1ABE] text-white flex justify-center items-center rounded-md m-auto mb-4 text-sm md:text-base hover:bg-[#3E1399] transition-all duration-300"
                            onClick={onSubmit}
                        >
                            Log In
                        </button>

                        <div className="w-full h-max flex flex-col justify-center items-center">
                            <p className="mb-4">or log in with</p>
                            <div className="flex flex-row w-2/3 justify-between">
                                <img
                                    src="../assets/instagram_logo.svg"
                                    alt="instagram"
                                    className="w-6 h-8 hover:scale-105 transition-transform"
                                />
                                <img
                                    src="../assets/facebook_logo.svg"
                                    alt="facebook"
                                    className="w-6 h-8 hover:scale-105 transition-transform"
                                />
                                <img
                                    src="../assets/google_logo.svg"
                                    alt="google"
                                    className="w-6 h-8 hover:scale-105 transition-transform"
                                />
                                <img
                                    src="../assets/linkedin_logo.svg"
                                    alt="linkedin"
                                    className="w-6 h-8 hover:scale-105 transition-transform"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {alertOpen ? (
                <div>
                    <Alert
                        severity={alertMessage.type}
                        className="fixed z-50 right-4 bottom-4"
                    >
                        <AlertTitle className="flex justify-between overflow-hidden">
                            {alertMessage.heading}
                            <button
                                className="scale-[1.5]"
                                onClick={handleAlertToggle}
                            >
                                <IoMdClose />
                            </button>
                        </AlertTitle>
                        {alertMessage.message}
                    </Alert>
                </div>
            ) : (
                ''
            )}
        </ThemeProvider>
    );
};

export default LoginPage;
