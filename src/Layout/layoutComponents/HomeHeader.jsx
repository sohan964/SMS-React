import React from 'react';
import logo from '../../assets/logo.png';

const HomeHeader = ({
    schoolName = 'St. Marys Girls High School And College',
    address = 'Kaligonj - Gazipur, Bangladesh',
    establishedYear = '1995',
    motto = 'Excellence in Education, Empowering Young Women',
    logoAlt = 'School logo',
}) => {
    return (
        <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3">

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* LEFT */}
                    <div className="flex items-center gap-4 group">

                        {/* Logo */}
                        <div className="relative">
                            <div className="w-16 md:w-20 rounded-full overflow-hidden border-2 border-blue-500 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                                <img src={logo} alt={logoAlt} className="object-cover w-full h-full" />
                            </div>

                            <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 blur-md transition duration-300"></div>
                        </div>

                        {/* Info */}
                        <div>
                            <h1 className="text-lg md:text-2xl font-extrabold text-white leading-tight">
                                {schoolName}
                            </h1>

                            <p className="text-sm text-slate-300">{address}</p>

                            <p className="text-xs italic text-blue-400 mt-1 hidden sm:block">
                                "{motto}"
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-4">

                        {/* Badge */}
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:scale-105 transition">
                            <span className="text-sm font-semibold">
                                Est. {establishedYear}
                            </span>
                        </div>

                        {/* Buttons */}
                        {/* <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow">
                                Dashboard
                            </button>
                            <button className="px-4 py-2 text-sm rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800 transition">
                                Profile
                            </button>
                        </div> */}

                    </div>

                </div>
            </div>
        </header>
    );
};

export default HomeHeader;