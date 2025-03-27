import "react-resizable/css/styles.css";
import { Resizable } from "react-resizable";
import { Children, useState } from "react";


const multiSeriesData = [
    { label: "Sales during month", value: "31" },
    { label: "Revenue after  it here it was fun t it", value: "43" },
    { label: "Profit value", value: "1" },
    { label: "Users get", value: "7" },
    { label: "Visits  it here it was fun t", value: "5" },
    { label: "Engagement", value: "3212" },
    { label: "Sales during month", value: "31" },
    { label: "Revenue after it here it was fun to do this challenge", value: "43" },
    { label: "Profit value if the get was not valuable", value: "1" },
    { label: "Users get", value: "7" },
    { label: "Visits  it here it was fun t", value: "53477891234" },
    { label: "Engagement", value: "3212" },
  ];

  const ResizableComponent = ({width ,height,onResize,children})=>{
    return (
        <Resizable width={width} height={height} onResize={onResize} resizeHandles={["se"]}>
            <div className="relative bg-[#171B1F] p-8 "
            style={{ width: `${width}px`, height: `${height}px` }}>
                {children}
            </div>
        </Resizable>
    )
  }
// Calculate grid size based on panel dimensions
const calculateGridSize = (panelWidth, panelHeight, itemCount) => {
    const columns = Math.ceil(Math.sqrt(itemCount));
    const rows = Math.ceil(itemCount / columns);
  
    return {
      itemWidth: panelWidth / columns,
      itemHeight: panelHeight / rows,
    };
  };

  const calculateDynamicFontSize = (itemWidth, itemHeight, textLength) => {
    const baseSize = Math.min(itemWidth / textLength, itemHeight / 2);
    return `${Math.max(baseSize,1)}px`; // Minimum size of 12px for readability
  };
  const MultySeriesPanel = ({data})=>{
    const [size,setSize]=useState ({width:600,height:300})
    const handleResize = (event, { size: newSize }) => setSize(newSize);

    const { itemWidth, itemHeight } = calculateGridSize(size.width, size.height, data.length);
    const calculateMinSize = () => {
        const minWidth = size.width / Math.ceil(multiSeriesData/2); // Minimum width based on panel width
        const minHeight = size.height / Math.ceil(multiSeriesData/4); // Minimum height based on panel height
        return Math.min(minWidth, minHeight); // Use the smaller value to ensure elements fit
      };

    return(
        <ResizableComponent width={size.width} height={size.height} onResize={handleResize}>
            <div className="grid gap-2 "
            style={{height:"100%" , gridAutoColumns: `repeat(auto-fit,minmax(${calculateMinSize()}px,1fr))`}}>
                {data.map((item, index)=>{
                     const valueFontSize = calculateDynamicFontSize(itemWidth, itemHeight, item.value.length);
                    
                    return (
                        <div key={index} className="text-white w-[100%] h-auto flex flex-col justify-center items-center ">

                            {/* <p style={{ fontSize: valueFontSize,  }}>{item.label}</p> */}
                            <p style={{ fontSize: valueFontSize, fontWeight: "bold" }}>{item.value}</p>
                        </div>
                    )
                })}
            </div>
        </ResizableComponent>
    )

  }

 export  const Ok =()=>{
    return(
        <div>
            <MultySeriesPanel data={multiSeriesData}/>
        </div>
    )
  }