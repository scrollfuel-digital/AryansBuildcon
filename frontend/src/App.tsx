import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import RouteSEO from "./seo/RouteSEO";

export default function App() {
  return (
    <>
      <RouteSEO />
      <AppRoutes />
    </>
  );
}
