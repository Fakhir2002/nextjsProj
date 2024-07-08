import Header from "./components/Header";
import Footer from "./components/Footer";
import Counter from "./components/Counter";
import UserProfile from "./components/UserProfile";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
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
