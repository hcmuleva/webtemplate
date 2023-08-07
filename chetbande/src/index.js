import App from "./App";
// import "./assets/css/style.css";
// import "./assets/css/result.css";
// import "./assets/css/home.css";
// import "./assets/css/quiz.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
