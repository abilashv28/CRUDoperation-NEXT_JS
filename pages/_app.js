import Head from 'next/head'; // Import the Head component
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/student.png" type="image/png" sizes="32x32" /> {/* Link to your student.png */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
