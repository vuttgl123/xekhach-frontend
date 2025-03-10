import Header from "../components/header/Header";
import Content from "../components/content/Content";
import Footer from "../components/footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      {/* Content */}
      <Content />
      {/* Footer */}
      <Footer />
    </div>
  );
}