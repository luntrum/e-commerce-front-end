import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/layout/header";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";

function App() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const showScrollButton = ["/", "/shopping-cart"].includes(location.pathname);

  return (
    <div className="bg-white">
      <header className="fixed top-0 z-10 mb-0 w-full bg-white">
        <Header />
      </header>
      <section className="bottom-0 mt-12">
        <Outlet />
        {isVisible && showScrollButton && (
          <Button
            icon={<VerticalAlignTopOutlined />}
            onClick={scrollToTop}
            className="fixed bottom-24 right-2 m-auto"
          />
        )}
      </section>
    </div>
  );
}

export default App;
