/* eslint-disable react-refresh/only-export-components */
import SectionWrapper from '../hoc/SectionWrapper';
import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';
import SwiperCarousel from '../components/SwiperCarousel';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

// Function to fetch course data from the API
const fetchCourse = async (id) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/volunteering/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching volunteering with id-${id}:`, error);
        return [];
    }
};

const TestimonialCard = () => {
    return (
        <div className="bg-[#44FFD1] w-full sm:w-3/4 md:w-2/4 h-auto p-6 flex flex-row justify-center items-center gap-10">
            {/* Testimonial Card */}
            <div className="font-bold">
                <h2>Surname</h2>
            </div>
            <div>
                <p className="text-sm mb-2 text-wrap text-ellipsis overflow-hidden whitespace-nowrap line-clamp-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nemo ratione eligendi dignissimos tempora adipisci, ullam
                    autem ad praesentium aspernatur.
                </p>
                <div className="flex flex-row">
                    <IoMdStar className="scale-150 mr-1" />
                    <IoMdStar className="scale-150 mx-1" />
                    <IoMdStar className="scale-150 mx-1" />
                    <IoMdStar className="scale-150 mx-1" />
                    <IoMdStarOutline className="scale-150 ml-1" />
                </div>
            </div>
        </div>
    );
};

const VolunteeringDetailsPage = () => {
    const { id } = useParams();
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [course, setCourse] = useState([]);
    const [applyModalOpen, setApplyModalOpen] = useState(false);
    const [applied, setApplied] = useState(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleApplyModalToggle = () => {
    setApplyModalOpen(!applyModalOpen);
};

const handleButtonChange = (value) => {
    setApplied(value);
};

const handleSubmit = () => {
    if (applied === null) {
        setErrorMessage('Let us know if you have applied!');
    } else {
        setErrorMessage('');
        if (applied === true) {
            navigate('/profile/myapp');
        } else {
            handleApplyModalToggle();
        }
    }
};
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCourse(id);
            setCourse(data);
        };
        fetchData();
    }, [id]);

    const [carouselData, setCarouselData] = useState([]);

    useEffect(() => {
        const fetchCarouselData = async () => {
            try {
                const endpoint = `http://localhost:8080/api/volunteering`;

                const response = await axios.get(endpoint);

                if (response.status === 200) {
                    const result = response.data;
                    let gatheredData = [];

                    if (typeof result === 'object') {
                        gatheredData = result
                            .slice(0, 5)
                            .map((item) => ({ ...item, type: 'volunteering' }));
                    }
                    setCarouselData(gatheredData);
                } else {
                    console.error('Failed to fetch cards');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCarouselData();
    }, []);
    useEffect(() => {
        const fetchFavoriteIds = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/api/favorites'
                );
                if (response.status === 200) {
                    setFavoriteIds(response.data.map((fav) => fav.card_id));
                }
            } catch (error) {
                console.error('Error fetching favorite IDs:', error);
            }
        };
        fetchFavoriteIds();
    }, []);

    return (
        <>
            <div className="w-full h-full flex flex-col justify-between items-center">
                <div className="w-full min-h-svh items-center flex flex-col relative top-16 mb-10">
                    <div className="w-full h-full py-12 flex justify-center bg-[url('../assets/img5.png')] items-center flex-col">
                        <div className={`w-5/6 aspect-[16/5] flex justify-center items-center rounded-md relative mb-16 ${course.image_url == null ? 'bg-gray-400' : ''}`}>
                            {course.image_url == null ? (
                                <img
                                    src="../assets/no_image.svg"
                                    alt="No Image Available"
                                    className="select-none w-1/4 h-1/4 lg:w-1/5 lg:h-1/5"
                                />
                            ) : (
                                <img
                                    src={course.image_url}
                                    alt="Course Image"
                                    className=" h-full w-auto max-w-full max-h-full object-cover lg:object-contain"
                                />
                            )}
                        </div>
                        <div className="flex flex-col justify-center items-center w-5/6 h-auto mb-12">
                            <h1 className="font-bold text-2xl mb-4">
                                Title of the Volunteering Opportunity
                            </h1>
                            {course.title ? (
                                <p className="text-center w-full md:w-1/2">{course.title}</p>
                            ) : (
                                <p className="text-center w-full md:w-1/2">
                                Visit{" "}
                                <span
                                    className="cursor-pointer text-blue-600 underline hover:scale-105 transition-all"
                                    onClick={() => (window.location.href = course.apply_link)}
                                >
                                    Source
                                </span>{" "}
                                for more information.
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col justify-center items-center w-5/6 h-auto mb-12">
                            <h1 className="font-bold text-2xl mb-4">
                                About The Volunteering Opportunity
                            </h1> 
                            {course.cause ? (
                            <p className="text-center w-full md:w-1/2">
                                {course.cause}
                            </p>
                            ) : (
                                <p className="text-center w-full md:w-1/2">
                                Visit{" "}
                                <span
                                    className="cursor-pointer text-blue-600 underline hover:scale-105 transition-all"
                                    onClick={() => (window.location.href = course.apply_link)}
                                >
                                    Source
                                </span>{" "}
                                for more information.
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col justify-center items-center w-5/6 h-auto mb-12">
                            <h1 className="font-bold text-2xl mb-4">Type of The Volunteering</h1>
                            {course.label ? (
                                <p className="text-center w-full md:w-1/2">{course.label}</p>
                            ) : (
                                <p className="text-center w-full md:w-1/2">
                                Visit{" "}
                                <span
                                    className="cursor-pointer text-blue-600 underline hover:scale-105 transition-all"
                                    onClick={() => (window.location.href = course.apply_link)}
                                >
                                    Source
                                </span>{" "}
                                for more information.
                                </p>
                            )}
                        </div> 
                    </div>

                    {/* Volunteering Details Section */}
                    <div className="w-full h-full py-24 flex justify-center items-center flex-col bg-[#4F1ABE] relative">
                    <div
                        className="absolute inset-0 hidden sm:block bg-no-repeat bg-left bg-contain"
                        style={{ backgroundImage: "url('../assets/image14.png')" }}
                    ></div>
                        {course.poseted_date && course.poseted_date !== "Unknown" && (
                        <div className="w-5/6 text-white flex flex-col items-center mb-6">
                            <h1 className="text-3xl font-bold">Date</h1>
                            <p>{course.poseted_date }</p>
                        </div>
                    )}
                    {course.location && course.location !== "Unknown" && (
                        <div className="w-5/6 text-white flex flex-col items-center mb-6">
                            <h1 className="text-3xl font-bold">Location</h1>
                            <p>{course.location }</p>
                        </div>
                    )}
                    {course.duration  && course.duration  !== "Unknown" && (
                        <div className="w-5/6 text-white flex flex-col items-center mb-6">
                            <h1 className="text-3xl font-bold">Duration</h1>
                            <p>{course.duration }</p>
                        </div>
                    )}
                    {course.source && course.source  !== "Unknown" && (
                        <div className="w-5/6 text-white flex flex-col items-center mb-6">
                            <h1 className="text-3xl font-bold">Organization</h1>
                            <p>{course.source }</p>
                        </div>
                        )}
                        <a
                            className="px-16 py-6 z-10 bg-white text-black font-bold text-xl rounded-lg hover:scale-105 transition-all"
                            href={course.apply_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => setApplyModalOpen(true)}
                        >
                            Apply Here
                        </a>
                    </div>
            {/* Source of this Opportunity Content Div */}
                    <div className="w-full h-full py-24 bg-[url('../assets/image8.png')] flex justify-center items-center flex-col">             
                        <h1 className="font-bold text-2xl mb-12 -mt-12">
                            Source of this Opportunity
                        </h1>
                        <div className="flex flex-col bg-[#A3A9FE] w-full  md:w-4/6 h-auto p-3  justify-center items-center gap-10">
                            <img
                                src={course.image_url}
                                alt="Course Image"
                                className="w-auto h-full mt-20 object-cover rounded-md select-none"
                            />
                            <div className="w-5/6 justify-center items-center flex flex-col py-12">
                                <h3 className="text-white">
                                    {course.source
                                        ? course.source
                                        : 'No Source'}
                                </h3>
                                <div className="flex flex-col mt-10">
                                    <button className="py-2 px-16 bg-white rounded-md my-4 hover:scale-[1.02] transition-all">
                                        {course.email}
                                    </button>
                                    <button className="py-2 px-16 bg-white rounded-md my-4 hover:scale-[1.02] transition-all">
                                        {course.phone_number}
                                    </button>
                                    <button className="py-2 px-16 bg-white rounded-md my-4 hover:scale-[1.02] transition-all">
                                        {course.office_address}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Testimonials Content Div */}
                        <h1 className="font-bold text-2xl mb-12 mt-20">
                            Testimonials
                        </h1>
                        <div className="h-auto pl-32 pr-32 flex flex-col xl:flex-row justify-between items-center gap-5 mb-16">
                            <TestimonialCard />
                            <TestimonialCard />
                            <TestimonialCard />
                        </div>
                    </div>
                    <div className="w-full h-auto py-24 flex justify-center  flex-col bg-[#4F1ABE] bg-[url('../assets/image15.png')] bg-no-repeat text-white">
                        {/* Carousel Div */}
                        <div className="flex flex-col justify-center items-center mb-16">
                            <h1 className="font-bold text-2xl mb-4">
                                Explore similar volunteering opportunities
                            </h1>
                            <p className="font-light text-lg">
                                Find your next opportunity
                            </p>
                        </div>
                        <div className="w-full h-full">
                            {/* Carousel */}
                            <SwiperCarousel
                                data={carouselData}
                                favoriteIds={favoriteIds}
                            />
                        </div>
                        <a
                            href="/volunteering"
                            className="font-light text-lg pl-96"
                        >
                            ← Go back to all Volunteering
                        </a>
                    </div>
                </div>
            </div>
            <Modal open={applyModalOpen} onClose={handleApplyModalToggle}>
                <div>
                    <Fade in={applyModalOpen}>
                    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
                        <div className="relative w-full max-w-lg bg-white shadow-lg rounded-3xl flex flex-col justify-center p-8">
                            <h1 className="font-bold text-[#4F1ABE] text-xl mb-6 text-center">Did you apply?</h1>
                            <div className="flex flex-col items-center space-y-4 mb-6">
                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <button
                                onClick={() => handleButtonChange(true)}
                                className={`relative uppercase px-6 py-2 rounded-full transition-all duration-300 border-2 border-transparent ${
                                    applied === true
                                    ? 'bg-[#4F1ABE] text-white'
                                    : 'bg-transparent border-violet-700'
                                } `}
                                >
                                yes
                                </button>
                                <p>or</p>
                                <button
                                onClick={() => handleButtonChange(false)}
                                className={`relative uppercase px-6 py-2 rounded-full transition-all duration-300 border-2 border-transparent ${
                                    applied === false
                                    ? 'bg-[#4F1ABE]  text-white'
                                    : 'bg-transparent border-violet-700'
                                } `}
                                >
                                no
                                </button>
                            </div>
                            </div>
                            {errorMessage && (
                        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                    )}
                            <div className="flex justify-center sm:justify-end">
                            <button
                                onClick={handleSubmit}
                                className="flex items-center justify-center space-x-2 px-8 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#4F1ABE] to-[#A3A9FE] rounded-full shadow-lg border border-transparent hover:from-[#4F1ABE] hover:to-[#A3A9FE] hover:scale-105 transition-transform duration-300 ease-in-out"
                            >
                                <span>Submit</span>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h14" />
                                </svg>
                            </button>
                            </div>
                        </div>
                    </div>
                    </Fade>
                </div>
            </Modal>
        </>
    );
};

export default SectionWrapper(VolunteeringDetailsPage);
