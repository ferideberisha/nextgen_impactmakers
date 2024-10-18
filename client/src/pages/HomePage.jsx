import SectionWrapper from '../hoc/SectionWrapper';
import SwiperCarousel from '../components/SwiperCarousel';

const FirstPart = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-[url('../assets/Group.png')] bg-cover bg-left-20">
            
            <div className="w-full min-h-svh items-center flex flex-col relative top-[20%] mb-20 ">
                <div className="flex flex-row ">
                <img
                src="../assets/Group 703.png"
                alt="Decorative Image"
                className="w-25 h-20 mb-10 object-cover opacity-100" 
            />
                    <h1 className="text-4xl text-white mb-8 ml-24 mr-40 font-bold  ">
                        Opportunities In One!
                    </h1>
                </div>
                <div className="mb-20">
                    <select
                        className="mr-5 border border-gray-300 rounded px-20 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="select-category"
                        id="select-category"
                    >
                        <option value="" disabled selected>
                            Select category
                        </option>
                        <option value="1">val 1</option>
                        <option value="2">val 2</option>
                        <option value="3">val 3</option>
                        <option value="4">val 4</option>
                        <option value="5">val 5</option>
                    </select>
                    <button
                        type="submit"
                        class="py-2 px-20 bg-[#44FFD1] text-black font-semibold  rounded-10px"
                    >
                        Search
                    </button>

                </div>
                <SwiperCarousel />
                
            </div>
            <div className="absolute bottom-0 right-0 m-5">
                <img
                    src="../assets/image 1.png" 
                    alt="chatbot"
                    className="w-25 h-25 object-cover "
                />
            </div>
        </div>
    );
};

const SecondPart = () => {
    return (
        <div className="bg-[#4F1ABE] text-white py-32 min-h-[500px] w-full relative overflow-hidden">
            <div className="container mx-auto text-center">
                <h2 className="text-[48px] font-bold mb-16">About PYE</h2>



                <p className="text-[18px] max-w-lg mx-auto">
                A platform aimedlimed at providing a trustful source of all Events, trainings, interships, and Volunteering opportunities in Kosova
                </p>
            </div>
        </div>
    );
};

const ThirdPart = () => {
    return (
        <div className="relative w-full h-screen ">
            <img
                src="../assets/image 4.png"
                alt="Background Decorative Image"
                className="absolute inset-0 w-full h-full object-cover opacity-50" 
            />

            <div className="relative flex flex-col items-center justify-center h-full bg-white bg-opacity-0 py-16">
                <h2 className="text-center text-4xl font-bold mb-16">
                    Our Services
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
    
                <a href="/internships"> 
                <div className="relative flex flex-col items-center group">
                    <img
                        src="../assets/Group 769.png" // Default image
                        alt="internships"
                        className="w-[400px] h-[350px] -mt-0 object-cover rounded-lg" 
                    />
                    <img
                        src="../assets/image 9.png" // Hover image
                        alt="internships Hover"
                        className="absolute top-0 left-0 w-[400px] h-[360px] -mt-1  rounded-xl object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300" // Shown on hover
                    />
                </div>
                    </a>

                <a href="/trainings"> 
                    <div className="relative flex flex-col items-center group">
                        <img
                        src="../assets/Group 770.png" // Default image
                        alt="trainings"
                        className="w-[400px] h-[350px] mb-2 object-cover rounded-lg "
                        />
                        <img
                        src="../assets/image 9.png" // Hover image
                        alt="trainings Hover"
                        className="absolute top-0 left-0 w-[400px] h-[360px] -mt-1 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300" // Shown on hover
                        />
                    </div>
                </a>
                <a href="/voolunteering"> 
                <div className="relative flex flex-col items-center group">
                    <img
                        src="../assets/Group 771.png" // Default image
                        alt="voolunteering"
                        className="w-[400px] h-[350px] mb-2 object-cover rounded-lg " 
                    />
                    <img
                        src="../assets/image 9.png" // Hover image
                        alt="voolunteering Hover"
                        className="absolute w-[400px] h-[360px] -mt-1  object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300" // Shown on hover
                    />
                </div>
                </a>

                <a href="/events"> 
                <div className="relative flex flex-col items-center group">
                    <img
                        src="../assets/Group 772.png" // Default image
                        alt="events"
                        className="w-[400px] h-[350px] mb-2 object-cover rounded-lg" 
                    />
                    <img
                        src="../assets/image 9.png" // Hover image
                        alt="events Hover"
                        className="absolute top-0 left-0 w-[400px] h-[360px] -mt-1 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300" // Shown on hover
                    />
                </div>
                </a>
                </div>
            </div>
        </div>
    );
};

const FourthPart = () => {
    return (
        <div className="relative w-full h-full">
            <img
                src="../assets/back2.png"
                alt="Background Decorative Image"
                className="absolute inset-0 w-full h-full object-cover opacity-90 py-30" 
            />

            <div className="relative flex flex-col items-center justify-center h-full bg-white bg-opacity-0 py-20">
                {/* Title */}
                <h1 className="text-5xl text-white text-center mb-10 font-bold  ">
                        Registered
                    </h1>

                    <h2 className="text-[32px] text-white  mb-20 font-poppins font-light opacity-100">
                        Users and Organizations
                    </h2>
                <div className="flex flex-nowrap justify-center mt-10 gap-80 max-w-2xl mx-auto text-center overflow-x-auto">
                
                    <div className=" text-white flex flex-col items-center italic ">
                        <img
                            src="../assets/Group 745.png"
                            alt="Individuals"
                            className="w-[120px] h-[120px] mb-2" 
                        />
                        <h1 className="text-4xl text-white text-center mt-10 mb-10 font-bold  ">
                        50,000
                    </h1>
                        <p className="text-sm">Individuals</p>
                    </div>

                    <div className=" text-white flex flex-col items-center italic ">
                        <img
                            src="../assets/Group 718.png"
                            alt="Organizations"
                            className="w-[120px] h-[120px] mb-2" // Uniform size for all images
                        />
                        <h1 className="text-4xl text-white text-center mt-10 mb-10 font-bold  ">
                        50,000
                    </h1>
                        <p className="text-sm">Organizations</p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

const FivethPart = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-[url('../assets/background4.png')]">
                <div className=" ">
                    <h1 className="text-4xl text-white text-center -mt-60 mb-10 font-bold  ">
                        Upcoming Opportunities
                    </h1>

                    <h2 className="text-[24px] text-white text-center mb-10 font-poppins font-light opacity-100">
                        Find your next opportunity{' '}
                    </h2>
                </div>
                <div className=""></div>
                <SwiperCarousel />
            
        </div>
    );
};


const SixthPart = () => {
    return (
        <div className="text-black py-32 min-h-[500px] w-full relative overflow-hidden">           
            <div className="container mx-auto text-center">
            <div className="pt-[0rem] pb-[7rem] "></div>
            <img
                src="../assets/Group 749.png"
                alt="Background Decorative Image"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
            />

            <div class="text-center text-3xl font-popins font-light z-10">Never stop growing with PYE!</div>    
            </div>        
        </div>
    );
};


const SeventhPart = () => {
    return (
            <div className="w-full h-full flex flex-col bg-[url('../assets/background3.png')] justify-center items-center py-20">

                <div className="text-white text-5xl font-bold mb-48">Reviews</div>

                <div className="relative w-full flex justify-center items-center -space-x-80">
                    <div class="relative flex justify-center items-center rounded-xl bg-[#4FEAC6] w-[44rem] h-56 p-6 shadow-lg z-10">
                        <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-white border-2 border-[#F6F49D]"></div>
                        <div class="text-sm md:text-base text-black">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </div>
                    </div>

                    <div class="relative flex justify-center items-center rounded-xl bg-[#F6F49D] w-[44rem] h-56 p-6 shadow-lg z-50 mb-44">
                        <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-white border-2 border-[#F6F49D]"></div>
                        <div class="text-sm md:text-base text-black">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi.
                        </div>
                    </div>

                    <div class="relative flex justify-center items-center rounded-xl bg-[#B3B5FF] w-[44rem] h-56 p-6 shadow-lg z-10">
                        <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-white border-2 border-[#F6F49D]"></div>
                        <div class="text-sm md:text-base text-black">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </div>
                    </div>
                </div>
        </div>
    );
};

const HomePage = () => {
    return (
        <div className="w-full h-full flex flex-col justify-between items-center">
            <FirstPart />
            <SecondPart />
            <ThirdPart />
            <FourthPart />
            <FivethPart />
            <SixthPart />
            <SeventhPart />
        </div>
    );
};

export default SectionWrapper(HomePage);
