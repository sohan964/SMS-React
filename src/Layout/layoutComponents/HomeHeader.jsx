import React from 'react';
import logo from '../../assets/logo.png';

const HomeHeader = ({
    schoolName = 'St. Marys Girls High School And College',
    address = 'Kaligonj - Gazipur, Bangladesh',
    logoAlt = 'St. Marys Girls High School And College logo',
}) => {
    return (
        <header role="banner" aria-label="School header" className="bg-base-100 border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-between">
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={logo} alt={logoAlt} />
                            </div>
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-base-content">
                                {schoolName}
                            </h1>
                            <p className="text-sm sm:text-base text-base-content/70">{address}</p>
                        </div>
                    </div>

                    {/* Right side is left intentionally empty; you can add quick links or contact info here if needed */}
                </div>
            </div>
        </header>
    );
};

export default HomeHeader;