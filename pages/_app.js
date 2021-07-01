import "antd/dist/antd.css";
import "../styles/globals.css";
import Principal from "../components/Principal";

function MyApp({ Component, pageProps }) {
  return (
    <Principal>
      <Component {...pageProps} />
    </Principal>
  );
}

export default MyApp;
