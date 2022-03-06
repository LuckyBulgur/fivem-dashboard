import { FC, HTMLProps } from 'react';

import Nav, { Title } from '../components/nav';

const Header: FC<HTMLProps<HTMLHeadElement>> = (props) => {
    return (
        <header className="w-screen">
            <Nav>
                <Title>{props.title}</Title>
            </Nav>
        </header>
    )
}

export default Header;