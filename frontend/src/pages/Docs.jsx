import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import ChatPanel from "../components/ChatPanel";

function Docs() {
  const [activeSection, setActiveSection] = useState("introduction");

  return (
    <div className="layout">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Content activeSection={activeSection} />
      <ChatPanel />
    </div>
  );
}

export default Docs;
