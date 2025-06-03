// source/pages/_app.js
import { AuthProvider } from "../auth/useAuth";
import { BrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout className="font-primary">
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
