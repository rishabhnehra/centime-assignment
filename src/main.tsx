import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./translations/i18next.ts";
import "./index.css";

async function deferRender() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { serviceWorker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return serviceWorker.start();
}

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
