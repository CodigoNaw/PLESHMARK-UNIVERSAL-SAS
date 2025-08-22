import Navbar from "./components/pagina inicial/Navbar";
import Hero from "./components/pagina inicial/Hero";
import Stats from "./components/pagina inicial/Stats";
import Features from "./components/pagina inicial/Features";
import Vacancies from "./components/pagina inicial/Vacancies";
import Footer from "./components/pagina inicial/Footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero />
      <Stats/>
      <Features/>
      <Vacancies />
      <Footer />
    </div>
  );
}
