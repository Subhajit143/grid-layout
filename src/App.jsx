// src/App.js
import React, { useState } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

// Sample data
const multiSeriesData = [
  { label: "Sales during month", value: "1" },
  { label: "Revenue after it", value: "44" },
  { label: "Profit value", value: "10" },
  { label: "Users get", value: "7" },
  { label: "Visits", value: "5" },
  { label: "Engagement to there", value: "15" },

];

// Resizable component
const ResizableComponent = ({ width, height, onResize, children }) => {
  return (
    <Resizable
      width={width}
      height={height}
      onResize={onResize}
      resizeHandles={["se"]} // Only show resize handle at the bottom-right corner
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          position: "relative",
          backgroundColor: "#171B1F", // Dark background color
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        {children}
      </div>
    </Resizable>
  );
};

// Multi-series panel
const MultiSeriesPanel = ({ data }) => {
  const [size, setSize] = useState({ width: 600, height: 300 }); // Initial size of the main component

  // Handle resize of the main component
  const handleResize = (event, { size }) => {
    setSize({ width: size.width, height: size.height });
  };

  // Calculate dynamic font size based on container size
  const calculateFontSize = (baseSize) => {
    const scaleFactor = Math.min(size.width / 400, size.height / 200); // Scale based on initial size
    return `${baseSize * scaleFactor}px`;
  };

  return (
    <ResizableComponent
      width={size.width}
      height={size.height}
      onResize={handleResize}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", // Responsive grid
          gap: "8px",

          height: "100%",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#0F1317", // Dark background for inside panels
              borderRadius: "8px",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFFFFF", // White text color
            }}
          >
            <p style={{ fontSize: calculateFontSize(5) }}>{item.label}</p>
            <p style={{ fontSize: calculateFontSize(28), fontWeight: "bold" }}>
              {item.value}
            </p>
            
          </div>
        ))}
      </div>
    </ResizableComponent>
  );
};

const SingleSeriesPanel = ({ data }) => {
  const [size, setSize] = useState({ width: 400, height: 400 }); // Initial size of the main component

  // Handle resize of the main component
  const handleResize = (event, { size }) => {
    setSize({ width: size.width, height: size.height });
  };

  // Calculate dynamic font size based on container size
  const calculateFontSize = (baseSize) => {
    const scaleFactor = Math.min(size.width / 300, size.height / 150); // Scale based on initial size
    return `${baseSize * scaleFactor}px`;
  };

  return (
    <ResizableComponent
      width={size.width}
      height={size.height}
      onResize={handleResize}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min-content, 1fr))", // Responsive grid
          gap: "8px",

          height: "100%",
        }}
      >
        {data.length > 0 && ( // Check if data array is not empty
          <div
            key={0} // Use index 0 for the first item
            style={{
              backgroundColor: "#0F1317", // Dark background for inside panels
              borderRadius: "8px",
              
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#FFFFFF", // White text color
            }}
          >
            <p style={{ fontSize: calculateFontSize(6) }}>{data[0].label}</p>
            <p style={{ fontSize: calculateFontSize(72), fontWeight: "bold" }}>
              {data[0].value}
            </p>
            
          </div>
        )}
      </div>
    </ResizableComponent>
  );
};
const App = () => {
  return (
    <div className="p-4 h-full w-full bg-[#0F1317]">
      
      <div className="w-full h-screen flex flex-col gap-10">
     <div>
     <h2 className="text-xl font-bold text-white mb-4">Multi Series Panel</h2>
     <MultiSeriesPanel data={multiSeriesData} />
     </div>
        <div>
        <h2 className="text-xl font-bold text-white mb-4">Single Series Panel</h2>
        <SingleSeriesPanel data={multiSeriesData}/>
        </div>
      </div>
      
    </div>
  );
};

export default App;
