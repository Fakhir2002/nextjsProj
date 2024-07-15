// pages/index.js
import Header from "../components/Header";
import Footer from "../components/Footer";
import Counter from "../components/Counter";
import UserProfile from "../components/UserProfile";
import styles from "./Home.module.css"; // Import the CSS module

export default function Home() {
  return (
    <div>
      <Header />
      <main className={styles.mainContent}>
        <h2>Home Page</h2>
        <p>This is the home page.</p>
        <Counter />
        <UserProfile name="Fakhir" age={20} />
        <UserProfile name="Qadeer" age={25} />
      </main>
      <Footer />
    </div>
  );
}
