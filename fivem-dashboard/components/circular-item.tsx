import { FC } from 'react';

interface CircularItemProps {
}

const CircularItem: FC<CircularItemProps> = ({ children, ...props }) => {
    return (
        <div className="bg-gray-500 rounded-full text-fontwhite sm:text-lg lg:text-xl font-semibold flex justify-center items-center w-14 h-14 sm:w-16 sm:h-16">
            {children}
        </div>
    );
}

export default CircularItem