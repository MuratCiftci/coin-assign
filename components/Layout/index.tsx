import { NavBar } from "../Navbar";

export const Layout = ({ children }: React.PropsWithChildren<any>) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};
