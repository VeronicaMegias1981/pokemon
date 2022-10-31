import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar } from '../ui';

interface Props extends PropsWithChildren {
    title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ title, children }) => {
    


    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Veronica Megias" />
                <meta name="description" content={`Información sobre el pokémon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />


                <meta property="og:title" content={` Información sobre el pokémon ${title} `} />
                <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>
            <Navbar></Navbar>
            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    )
};
