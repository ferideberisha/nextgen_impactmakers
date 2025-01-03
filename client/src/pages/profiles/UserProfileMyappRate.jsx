import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Footer from '../../components/Footer';

const UserProfileMyappRate = () => {
    const { t } = useTranslation();

    const [review, setReview] = useState('');
    const theme = createTheme({
        palette: {
            primary: {
                main: '#4F1ABE',
            },
        },
    });

    // Function to handle review submission
    const handleSubmitReview = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/submit_review',
                {
                    review: review,
                },
                {
                    withCredentials: true,
                }
            );

            if (response.data.message) {
                alert('Review submitted successfully!');
                setReview('');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('There was an error submitting your review.');
        }
    };

    const [username, setUsername] = useState('Username');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/api/user/profile',
                    {
                        withCredentials: true,
                    }
                );

                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="min-h-screen w-full bg-custom-gradient-2 flex flex-col items-center py-20 relative">
                <img
                    src="/assets/bg-design.png"
                    alt=""
                    className="absolute bottom-0 left-0 z-10 opacity-50"
                />

                {/* Profile Header */}
                <div className="flex flex-col items-center md:flex-row md:justify-between w-full max-w-2xl md:max-w-4xl lg:max-w-5xl p-4 mb-16 md:mb-32 z-20">
                    <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-4">
                        <img
                            src="/assets/icon2.png"
                            alt="User Icon"
                            className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-full -mb-2 md:mr-10"
                        />
                        <div className="text-center md:text-left">
                            <p className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 md:mb-4">
                                {username || 'Username'}
                            </p>
                            <nav className="hidden sm:flex space-x-5 text-white font-bold text-lg">
                                <Link to="/profile/edit">
                                    {t(
                                        'profile.participant.navigation.edit-profile'
                                    )}
                                </Link>
                                <Link to="/profile/myapp">
                                    {t(
                                        'profile.participant.navigation.my-applications'
                                    )}
                                </Link>
                                <Link to="/profile/saved">
                                    {t(
                                        'profile.participant.navigation.saved-for-later'
                                    )}
                                </Link>
                                <Link
                                    to="/profile/rate"
                                    className="text-[#FF9202]"
                                >
                                    {t(
                                        'profile.participant.navigation.rate-this-website'
                                    )}
                                </Link>
                            </nav>
                        </div>
                    </div>
                    <div className="flex space-x-2 w-24 h-auto md:mt-20">
                        <button className="text-white text-3xl p-2 ">
                            &#x1F56D;
                        </button>
                        <button className="text-white text-3xl p-2 ">
                            &#9881;
                        </button>
                    </div>
                </div>

                <div className="w-full h-auto flex justify-center z-20">
                    <div className="w-2/3 h-full flex flex-col justify-center items-end">
                        <TextField
                            id="review"
                            label={t('profile.participant.review-text')}
                            className="w-full lg:w-3/4 p-4 rounded-md resize-none bg-white"
                            multiline
                            rows={8}
                            variant="filled"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <button
                            className="my-4 px-6 py-4 bg-[#50BACF] text-white font-semibold rounded-md hover:bg-[#4ba8bb] hover:scale-105 transition-all z-30"
                            onClick={handleSubmitReview}
                        >
                            Save changes
                        </button>
                    </div>
                </div>

                <Footer withBackground={false} />
            </div>
        </ThemeProvider>
    );
};

export default UserProfileMyappRate;
