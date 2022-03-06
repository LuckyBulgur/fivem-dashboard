import classnames from 'classnames';
import { FC } from 'react';


interface CardProps {
    title: string;
    className?: string;
}

interface CardItemProps {
    subtitle?: string;
}

export const CardItem: FC<CardItemProps> = ({ children, ...props }) => {
    return (
        <div className="dark:bg-myblue flex-col flex text-center dark:bg-opacity-50 p-3 text-fontwhite font-sans">
            <div className='bg-gray-500 text-base sm:text-lg lg:text-3xl rounded-lg p-2'>
                {children}
            </div>
            <div className='text-xs lg:text-base'>{props.subtitle}</div>
        </div>
    );
}

const Card: FC<CardProps> = ({ className, children, ...props }) => {
    return (
        <div className={classnames("dark:bg-myblue bg-opacity-20 bg-gray-400 p-7 rounded-xl", className)}>
            <h1 className='text-2xl sm:text-5xl text-authgreen text-center mb-2 font-bold'>{props.title}</h1>
            {children}
        </div>
    );
}

export default Card;