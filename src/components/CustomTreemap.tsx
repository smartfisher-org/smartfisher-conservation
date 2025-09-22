import React from 'react';

interface TreemapItem {
  name: string;
  value: number;
  invasive: boolean;
}

interface CustomTreemapProps {
  data: TreemapItem[];
  width: number;
  height: number;
}

// Improved treemap layout algorithm
const createTreemapLayout = (data: TreemapItem[], width: number, height: number) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const rects: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    item: TreemapItem;
    percentage: number;
  }> = [];

  // Sort data by value descending for better layout
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  let currentX = 0;
  let currentY = 0;
  let remainingWidth = width;
  let remainingHeight = height;
  
  sortedData.forEach((item, index) => {
    const percentage = (item.value / total) * 100;
    const area = (item.value / total) * (width * height);
    
    let rectWidth, rectHeight;
    
    if (index === sortedData.length - 1) {
      // Last item takes remaining space
      rectWidth = remainingWidth;
      rectHeight = remainingHeight;
    } else {
      // Calculate dimensions based on remaining area and optimal aspect ratio
      const aspectRatio = remainingWidth / remainingHeight;
      
      if (aspectRatio > 1) {
        // Wider than tall - place items horizontally
        rectWidth = (item.value / total) * width;
        rectHeight = remainingHeight;
      } else {
        // Taller than wide - place items vertically  
        rectWidth = remainingWidth;
        rectHeight = (item.value / total) * height;
      }
    }
    
    rects.push({
      x: currentX,
      y: currentY,
      width: Math.max(rectWidth, 50), // Minimum width
      height: Math.max(rectHeight, 40), // Minimum height
      item,
      percentage
    });
    
    // Update position for next rectangle
    if (remainingWidth > remainingHeight) {
      currentX += rectWidth;
      remainingWidth -= rectWidth;
    } else {
      currentY += rectHeight;
      remainingHeight -= rectHeight;
    }
  });
  
  return rects;
};

export default function CustomTreemap({ data, width, height }: CustomTreemapProps) {
  const rectangles = createTreemapLayout(data, width, height);
  
  return (
    <svg width={width} height={height} className="overflow-hidden">
      {rectangles.map((rect, index) => {
        const bgColor = rect.item.invasive ? 'rgba(220, 38, 38, 0.8)' : 'rgba(34, 197, 94, 0.8)'; // More transparent
        const textColor = 'white';
        const canShowText = rect.width > 80 && rect.height > 50;
        
        return (
          <g key={index}>
            <rect
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill={bgColor}
              stroke="white"
              strokeWidth={2}
              className="transition-all duration-200 hover:brightness-110"
            />
            {canShowText && (
              <g>
                <text
                  x={rect.x + 8}
                  y={rect.y + 20}
                  fill={textColor}
                  fontSize="12"
                  fontWeight="600"
                  className="font-semibold"
                >
                  {rect.item.name.length > 25 
                    ? rect.item.name.substring(0, 25) + '...' 
                    : rect.item.name}
                </text>
                <text
                  x={rect.x + 8}
                  y={rect.y + 38}
                  fill={textColor}
                  fontSize="11"
                  fontWeight="500"
                >
                  Count: {rect.item.value}
                </text>
                <text
                  x={rect.x + 8}
                  y={rect.y + 54}
                  fill={textColor}
                  fontSize="11"
                  fontWeight="500"
                >
                  Percentage: {rect.percentage.toFixed(1)}%
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}