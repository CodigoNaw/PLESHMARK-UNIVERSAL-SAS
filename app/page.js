import Navbar from "./components/pagina inicial/Navbar";
import Hero from "./components/pagina inicial/Hero";
import Features from "./components/pagina inicial/Features";
import Vacancies from "./components/pagina inicial/Vacancies";
import Footer from "./components/pagina inicial/Footer";
import Market from "./components/pagina inicial/Market";
import Crear from "./components/pagina inicial/Crear";
import Qr from "./components/pagina inicial/Qr";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero />
      <Features/>
      <Market/>
      <Crear/>
      <Vacancies />
      <Qr/>
      <Footer />
    </div>
  );
}
