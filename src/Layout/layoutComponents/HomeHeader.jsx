import React from 'react';
import logo from '../../assets/logo.png';

const HomeHeader = ({
    schoolName = 'St. Marys Girls High School And College',
    address = 'Kaligonj - Gazipur, Bangladesh',
    establishedYear = '1995',
    motto = 'Excellence in Education, Empowering Young Women',
    logoAlt = 'St. Marys Girls High School And College logo',
}) => {
    return (
        <header role="banner" aria-label="School header" className="w-full border-b shadow-sm bg-gradient-to-r from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-between">
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="w-16 sm:w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={logo} alt={logoAlt} />
                            </div>
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-base-content">
                                {schoolName}
                            </h1>
                            <p className="text-sm sm:text-base text-base-content/70">{address}</p>
                            <p className="text-xs sm:text-sm text-base-content/60 italic mt-1">"{motto}"</p>
                        </div>
                    </div>

                    <div className="text-center sm:text-right">
                        <p className="text-sm sm:text-base font-medium text-base-content/80">
                            Established in {establishedYear}
                        </p>
                        {/* <div className="flex gap-3 mt-2 justify-center sm:justify-end">
                            <button className="btn btn-sm btn-primary text-white">Admission</button>
                            <button className="btn btn-sm btn-outline btn-primary">Contact</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HomeHeader;