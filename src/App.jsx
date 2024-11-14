import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";

function App() {
  return (
    <div className="bg-white">
      <header className="fixed top-0 z-10 w-full bg-white">
        <Header />
      </header>
      <section className="bottom-0 mt-16">
        <Outlet />
      </section>
    </div>
  );
}

export default App;
