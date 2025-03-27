import { useState } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

// Sample data
const multiSeriesData = [
  { label: "Sales during month", value: "31" },
  { label: "Revenue after  it here it was fun t it", value: "43" },
  { label: "Profit value", value: "1" },
  { label: "Users get", value: "7" },
  { label: "Visits  it here it was fun t", value: "5" },
  { label: "Engagement", value: "3212" },
  { label: "Sales during month", value: "31" },
  { label: "Revenue after it here it was fun to do this challenge ,after it here it was fun to do this after it here it was fun to do this ", value: "43" },
  { label: "Profit value if the get was not valuable", value: "1" },
  { label: "Users get", value: "7" },
  { label: "Visits  it here it was fun t", value: "53477891234" },
  { label: "Engagement", value: "3212" },
];

// Resizable Component Wrapper
const ResizableComponent = ({ width, height, onResize, children }) => {
  return (
    <Resizable width={width} height={height} onResize={onResize} resizeHandles={["se"]}>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          position: "relative",
          backgroundColor: "#171B1F",
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        {children}
      </div>
    </Resizable>
  );
};

// Calculate grid size based on panel dimensions
const calculateGridSize = (panelWidth, panelHeight, itemCount) => {
  const columns = Math.ceil(Math.sqrt(itemCount));
  const rows = Math.ceil(itemCount / columns);

  return {
    itemWidth: panelWidth / columns,
    itemHeight: panelHeight / rows,
  };
};

// Calculate dynamic font size based on grid item dimensions
const calculateDynamicFontSize = (itemWidth, itemHeight, textLength) => {
  const baseSize = Math.min(itemWidth / textLength, itemHeight / 2);
  return `${Math.max(baseSize,1)}px`; // Minimum size of 12px for readability
};
const calculateDynamicFontSizeLable = (itemWidth, itemHeight, textLength) => {
    const baseSize = Math.min(itemWidth / textLength, itemHeight / 10);
    return `${Math.max(baseSize,1)}px`; // Minimum size of 12px for readability
  };
// Multi-Series Panel Component
const MultiSeriesPanel = ({ data }) => {
  const [size, setSize] = useState({ width: 600, height: 300 });

  const handleResize = (event, { size: newSize }) => setSize(newSize);

  const { itemWidth, itemHeight } = calculateGridSize(size.width, size.height, data.length);

  const calculateMinSize = () => {
    const minWidth = size.width / 6; // Minimum width based on panel width
    const minHeight = size.height / 3; // Minimum height based on panel height
    return Math.min(minWidth, minHeight); // Use the smaller value to ensure elements fit
  };

  return (
    <ResizableComponent width={size.width} height={size.height} onResize={handleResize}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(${calculateMinSize()}px, 1fr))`,
         
          gap: "5px",
          height: "100%",
        }}
      >
        {data.map((item, index) => {
          const labelFontSize = calculateDynamicFontSizeLable(itemWidth, itemHeight, item.label.length);
          const valueFontSize = calculateDynamicFontSize(itemWidth, itemHeight, item.value.length);

          return (
            <div
              key={index}
              style={{
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#FFFFFF",
                width: "100%",
                height: "auto",
                gap:"2px", 
              }}
            >
              <p className=" flex bottom-20" style={{ fontSize: labelFontSize }}>{item.label}</p>
              <p style={{ fontSize: valueFontSize, fontWeight: "bold" }}>{item.value}</p>
            </div>
          );
        })}
      </div>
    </ResizableComponent>
  );
};

// App Component
const App = () => {
  return (
    <div className="p-4 h-full w-full bg-[#0F1317]">
      <div className="w-full h-screen flex flex-col gap-10">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Multi Series Panel</h2>
          <MultiSeriesPanel data={multiSeriesData} />
        </div>
      </div>
    </div>
  );
};

export default App;
