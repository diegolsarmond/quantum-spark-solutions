import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CRMAdvogados from "@/components/CRMAdvogados";
import Contact from "@/components/Contact";

const CRM = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CRMAdvogados />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default CRM;
