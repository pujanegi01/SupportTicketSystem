import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="appShell">
        <BrowserRouter>
          <Sidebar />
          <main className="appMain">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateTicket />} />
              <Route path="/ticket/:id" element={<TicketDetails />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;