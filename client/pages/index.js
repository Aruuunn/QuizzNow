import Head from "next/head";
import { GoogleLogin } from "react-google-login";
import styles from "../styles/Home.module.css";


const responseGoogle = (response) => {
  console.log(response);
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Google Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleLogin 
      clientId={"325287323767-rg3is60mid0devd732iq975p5pqa1h8f.apps.googleusercontent.com"}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      />
    </div>
  );
}
