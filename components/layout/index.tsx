import type { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            {/*<Navbar />*/}
            <main>{children}</main>
            {/*<Footer />*/}
        </>
    );
};

export default Layout;