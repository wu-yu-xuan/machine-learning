import "rc-tooltip/assets/bootstrap_white.css";
import ReactDOM from "react-dom/client";
import KMeansCluster from "./components/KMeansCluster";
import LinearRegression from "./components/LinearRegression";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <LinearRegression />
  <KMeansCluster />
);
