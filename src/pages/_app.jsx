import { Providers } from "@/redux/provider";
import '@/app/globals.css';
import Navbar from "@/components/layout/navbar";

export default function App({ Component, pageProps }) {
  return (
    <Providers>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </Providers>
  )
}