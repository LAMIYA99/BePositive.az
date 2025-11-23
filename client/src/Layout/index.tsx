import Header from "./Header";
import Footer from "./Footer/intex";
import { children } from "@/Types/global";

const Layout = ({ children }: children) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
