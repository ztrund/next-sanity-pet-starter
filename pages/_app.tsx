// _app.tsx
import type {AppProps} from 'next/app';
import '../styles/globals.css';

// import {useEffect} from "react";

function MyApp({ Component, pageProps }: AppProps) {
    // useEffect(() => {
    //     if ('serviceWorker' in navigator) {
    //         window.addEventListener('load', function() {
    //             navigator.serviceWorker.register('/serviceWorker.js').then(function(registration) {
    //                 console.log('ServiceWorker registration successful with scope: ', registration.scope);
    //             }, function(err) {
    //                 console.log('ServiceWorker registration failed: ', err);
    //             });
    //         });
    //     }
    // }, []);

    return (
        <Component {...pageProps} />
    );
}

export default MyApp;
