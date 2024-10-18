/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    AlertTitle,
    Alert,
    TextField,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    Checkbox,
    FormGroup,
    FormControlLabel,
} from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4F1ABE',
        },
    },
});

const ParticipantForm = ({ participantData, handleChange, errors }) => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                component="div"
                sx={{
                    '& > :not(style)': { width: '100%', my: '7px' },
                }}
                noValidate
                autoComplete="off"
                className="w-full"
            >
                <TextField
                    type="text"
                    id="username"
                    label="Username"
                    variant="outlined"
                    required
                    name="username"
                    value={participantData.username || ''}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.username}
                    helperText={errors.username ? 'Username is invalid!' : ''}
                />
                <TextField
                    type="email"
                    id="email"
                    label="Email"
                    variant="outlined"
                    required
                    name="email"
                    value={participantData.email || ''}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.email}
                    helperText={errors.email ? 'Email is invalid!' : ''}
                />
                <TextField
                    type="text"
                    id="phone"
                    label="Phone"
                    variant="outlined"
                    required
                    name="phone"
                    value={participantData.phone || ''}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.phone}
                    helperText={errors.phone ? 'Phone number is invalid!' : ''}
                />
                <TextField
                    type="password"
                    id="password"
                    label="Password"
                    variant="outlined"
                    color="primary"
                    required
                    name="password"
                    value={participantData.password || ''}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.password}
                    helperText={errors.password ? 'Password is invalid' : ''}
                />
            </Box>
        </ThemeProvider>
    );
};

const ParticipantSecondForm = ({ preferencesData, handleChange }) => {
    const [checked, setChecked] = useState(preferencesData || []);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        handleChange(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <List className="w-full bg-[#A3A9FE45] rounded-md h-auto max-h-96 overflow-y-scroll">
                {[
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19,
                ].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem key={value} disablePadding>
                            <ListItemButton
                                role={undefined}
                                onClick={handleToggle(value)}
                                dense
                            >
                                <ListItemText
                                    id={labelId}
                                    primary={`Line item ${value + 1}`}
                                />
                                <ListItemIcon>
                                    <Checkbox
                                        edge="end"
                                        checked={checked.includes(value)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </ThemeProvider>
    );
};

const OrganizationForm = ({ orgData, handleChange, errors }) => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                component="div"
                sx={{
                    '& > :not(style)': { width: '100%', my: '7px' },
                }}
                noValidate
                autoComplete="off"
                className="w-full"
            >
                <TextField
                    type="text"
                    id="name_of_org"
                    label="Name Of Organization"
                    variant="outlined"
                    required
                    name="name_of_org"
                    value={orgData.name_of_org || ''}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.name_of_org}
                    helperText={
                        errors.name_of_org
                            ? 'Please enter a valid organization name.'
                            : ''
                    }
                />
                <TextField
                    type="email"
                    id="email_of_org"
                    label="Email"
                    variant="outlined"
                    required
                    name="email_of_org"
                    value={orgData.email_of_org || ''}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.email_of_org}
                    helperText={
                        errors.email_of_org ? 'Please enter a valid email.' : ''
                    }
                />
                <TextField
                    type="text"
                    id="phone_number_of_org"
                    label="Phone Number"
                    variant="outlined"
                    required
                    name="phone_number_of_org"
                    value={orgData.phone_number_of_org || ''}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.phone_number_of_org}
                    helperText={
                        errors.phone_number_of_org
                            ? 'Please enter a valid phone number.'
                            : ''
                    }
                />
                <TextField
                    type="password"
                    id="password_of_org"
                    label="Password"
                    variant="outlined"
                    required
                    name="password_of_org"
                    value={orgData.password_of_org || ''}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.password_of_org}
                    helperText={
                        errors.password_of_org
                            ? 'Please enter a valid password.'
                            : ''
                    }
                />
                <TextField
                    type="text"
                    id="url_of_org"
                    label="URL"
                    variant="outlined"
                    required
                    name="url_of_org"
                    value={orgData.url_of_org || ''}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.url_of_org}
                    helperText={
                        errors.url_of_org ? 'Please enter a valid URL.' : ''
                    }
                />
                <TextField
                    type="text"
                    id="description_of_org"
                    label="Description"
                    variant="outlined"
                    multiline
                    maxRows={2}
                    required
                    name="description_of_org"
                    value={orgData.description_of_org || ''}
                    onChange={(e) => handleChange(e)}
                    error={!!errors.description_of_org}
                    helperText={
                        errors.description_of_org
                            ? 'Please enter a valid description.'
                            : ''
                    }
                />
            </Box>
        </ThemeProvider>
    );
};

const MainForm = () => {
    const navigate = useNavigate();
    const [isOrg, setOrg] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState({
        type: 'success',
        heading: 'Success',
        message: '',
    });

    const [isParticipantSecondForm, setParticipantSecondForm] = useState(false);

    const [participantData, setParticipantData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
    });
    const [preferencesData, setPreferencesData] = useState([]);
    const [orgData, setOrgData] = useState({
        name_of_org: '',
        email_of_org: '',
        phone_number_of_org: '',
        password_of_org: '',
        url_of_org: '',
        description_of_org: '',
    });

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        phone: false,
        password: false,
        name_of_org: false,
        email_of_org: false,
        phone_number_of_org: false,
        password_of_org: false,
        url_of_org: false,
        description_of_org: false,
    });

    const handleAlertToggle = () => {
        setAlertOpen(!alertOpen);
    };

    const handleParticipantChange = (e) => {
        setParticipantData({
            ...participantData,
            [e.target.name]: e.target.value,
        });
        setErrors({ ...errors, [e.target.name]: false });
    };

    const handlePreferencesChange = (e) => {
        setPreferencesData([...preferencesData, e]);
    };

    const handleOrgChange = (e) => {
        setOrgData({
            ...orgData,
            [e.target.name]: e.target.value,
        });
        setErrors({ ...errors, [e.target.name]: false });
    };

    const onFormTypeChange = () => {
        setOrg(!isOrg);
        setAlertOpen(false);
        setParticipantData({
            name: '',
            email: '',
            phone: '',
            password: '',
        });
        setOrgData({
            name_of_org: '',
            email_of_org: '',
            phone_number_of_org: '',
            password_of_org: '',
            url_of_org: '',
            description_of_org: '',
        });
    };

    const resetData = () => {
        setParticipantSecondForm(false);
        setPreferencesData([]);
        setParticipantData({
            name: '',
            email: '',
            phone: '',
            password: '',
        });
        setOrgData({
            name_of_org: '',
            email_of_org: '',
            phone_number_of_org: '',
            password_of_org: '',
            url_of_org: '',
            description_of_org: '',
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let hasError = false;
        const newErrors = { ...errors };

        if (isOrg) {
            if (!orgData.name_of_org) {
                newErrors.name_of_org = true;
                hasError = true;
            }
            if (!orgData.email_of_org || !validateEmail(orgData.email_of_org)) {
                newErrors.email_of_org = true;
                hasError = true;
            }
            if (!orgData.phone_number_of_org) {
                newErrors.phone_number_of_org = true;
                hasError = true;
            }
            if (!orgData.password_of_org) {
                newErrors.password_of_org = true;
                hasError = true;
            }
            if (!orgData.url_of_org) {
                newErrors.url_of_org = true;
                hasError = true;
            }
            if (!orgData.description_of_org) {
                newErrors.description_of_org = true;
                hasError = true;
            }
        } else {
            if (!participantData.username) {
                newErrors.username = true;
                hasError = true;
            }
            if (
                !participantData.email ||
                !validateEmail(participantData.email)
            ) {
                newErrors.email = true;
                hasError = true;
            }
            if (!participantData.phone) {
                newErrors.phone = true;
                hasError = true;
            }
            if (!participantData.password) {
                newErrors.password = true;
                hasError = true;
            }
        }
        setErrors(newErrors);
        return !hasError;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) return;

        try {
            if (isOrg) {
                const response = await axios.post(
                    'http://localhost:8080/signup',
                    {
                        ...orgData,
                        isOrg: true,
                    }
                );
                handleSuccessResponse(response);
            } else {
                if (isParticipantSecondForm) {
                    const response = await axios.post(
                        'http://localhost:8080/signup',
                        participantData
                    );
                    handleSuccessResponse(response);
                } else {
                    setParticipantSecondForm(true);
                }
            }
        } catch (error) {
            handleFailedResponse(error);
        }
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
                'Signup failed. Please try again.',
        });
        setAlertOpen(true);
        resetData();
    };

    return (
        <>
            <div className="w-11/12 sm:w-4/5 md:w-5/6 xl:w-5/6 h-[95%] flex justify-center items-center flex-col">
                <h2 className="text-xl md:text-2xl xl:text-3xl text-black font-bold mt-4">
                    Sign Up
                </h2>
                <h2 className="text-sm md:text-base xl:text-lg text-black italic font-normal mb-1">
                    Create An Account
                </h2>
                <h3 className="font-bold mb-4 text-base md:text-lg">
                    Are you a
                </h3>
                <div className="flex flex-row justify-center items-center w-full md:w-2/3 lg:w-1/2 mb-4">
                    <button
                        disabled={!isOrg}
                        onClick={onFormTypeChange}
                        type="button"
                        className="bg-[#C5C5C5] border-none rounded-md focus:outline-none py-2 px-4 md:px-6 text-[#4F1ABE] text-sm disabled:bg-[#4F1ABE] disabled:scale-95 disabled:text-white transition-all"
                    >
                        Participant
                    </button>
                    <p className="mx-2 text-sm md:text-base">or</p>
                    <button
                        disabled={isOrg}
                        onClick={onFormTypeChange}
                        type="button"
                        className="bg-[#C5C5C5] border-none rounded-md focus:outline-none py-2 px-4 md:px-6 text-[#4F1ABE] text-sm disabled:bg-[#4F1ABE] disabled:scale-95 disabled:text-white transition-all"
                    >
                        Organization
                    </button>
                </div>
                {!isOrg ? (
                    !isParticipantSecondForm ? (
                        <ParticipantForm
                            participantData={participantData}
                            handleChange={handleParticipantChange}
                            errors={errors}
                        />
                    ) : (
                        <ParticipantSecondForm
                            preferencesData={preferencesData}
                            handleChange={handlePreferencesChange}
                        />
                    )
                ) : (
                    <OrganizationForm
                        orgData={orgData}
                        handleChange={handleOrgChange}
                        errors={errors}
                    />
                )}
                <button
                    type="button"
                    onClick={onSubmit}
                    className="py-2 px-16 lg:px-24 bg-[#4F1ABE] text-white flex justify-center items-center rounded-md m-auto my-4 text-sm md:text-base"
                >
                    {isOrg ? 'Finish' : 'Continue'}
                </button>
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
        </>
    );
};

const SignupPage = () => {
    return (
        <div className="w-screen min-h-screen h-auto flex flex-col justify-center items-center bg-[#4F1ABE]">
            <form className="w-11/12 sm:w-3/5 md:w-3/5 lg:w-2/4 h-auto flex bg-white rounded-lg flex-col justify-center items-center px-4 md:px-8 my-4">
                <MainForm />
            </form>
        </div>
    );
};

export default SignupPage;
