import { useState } from "react";

export default function TruncatedContent({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="overflow-hidden">
      <div
        className="overflow-hidden"
        style={{
          height: isExpanded ? "100%" : "5em",
        }}
      >
        {children}
      </div>

      <button onClick={handleExpand} className="text-blue-600 hover:underline">
        {isExpanded ? "Thu gọn" : "Mở rộng"}
      </button>
    </div>
  );
}
