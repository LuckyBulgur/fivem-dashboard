import Link from 'next/link';
import { AnchorHTMLAttributes, FC, HTMLProps } from 'react';

import useUser from '../hooks/use-user';

interface HomePageProps {
    primaryText: string;
    secondaryText: string;
}

const LinkButton: FC<HTMLProps<HTMLAnchorElement>> = ({ children, ...props }) => {
    return (
        <Link passHref href={props.href!}><div className='font-semibold flex cursor-pointer items-center h-8 sm:h-12 px-6 rounded-lg justify-center hover:bg-gray-400 text-xs sm:text-base w-36 sm:w-44 text-myblue bg-white'>{children}</div></Link>
    );
};


const HomePage: FC<HomePageProps> = ({ primaryText, secondaryText }) => {

    const user = useUser();

    return (
        <div className="flex h-5/6 justify-center pl-5 pr-5">
            <div className="text-fontwhite max-w-5xl relative pt-20 sm:pt-24 lg:pt-32">
                <h1 className='text-fontwhite text-5xl sm:text-7xl lg:text-8xl mt-28 font-extrabold text-center tracking-tight font-sans'>{primaryText}</h1>
                <p className='text-xs sm:text-lg lg:text-xl text-center text-gray-200 mt-7 font-sans'>{secondaryText}</p>
                <div className="mt-6 sm:mt-8 flex justify-center space-x-6">
                    <LinkButton href='http://localhost:3001/auth/login'>Jetzt loslegen</LinkButton>
                    {user && user.isSuccess && user.data &&
                        <LinkButton href='/dashboard'>Dashboard</LinkButton>
                    }
                </div>
            </div>
        </div>
    );
}

export default HomePage;