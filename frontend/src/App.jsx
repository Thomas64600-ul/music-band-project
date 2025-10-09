import Header from "./components/Header";
import logo from "./assets/logo.png";

export default function App() {
  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Musique", path: "/Music" },
    { name: "Concerts", path: "/concerts" },
    { name: "Blog", path: "/blog" },
    { name: "Cagnotte", path: "/cagnotte" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header
        logoSrc={logo}
        siteTitle="REVEREN"
        links={menuLinks}
        bgColor="#0B101C"
        accentColor="#FFD700"
        defaultDark={true}
      />
    </div>
  );
}






