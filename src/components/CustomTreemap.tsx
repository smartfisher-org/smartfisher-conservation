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

// Improved treemap layout algorithm that ensures all items are visible
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
  
  // Use a grid-based approach to ensure all items are visible
  let currentX = 0;
  let currentY = 0;
  let rowHeight = 0;
  const maxRowWidth = width;
  
  sortedData.forEach((item, index) => {
    const percentage = (item.value / total) * 100;
    const proportionalArea = (item.value / total) * (width * height);
    
    // Calculate ideal dimensions based on proportion
    let rectWidth = Math.sqrt(proportionalArea * (width / height));
    let rectHeight = proportionalArea / rectWidth;
    
    // Ensure minimum sizes for visibility
    rectWidth = Math.max(rectWidth, width * 0.15); // At least 15% of width
    rectHeight = Math.max(rectHeight, height * 0.2); // At least 20% of height
    
    // Check if we need to start a new row
    if (currentX + rectWidth > maxRowWidth && currentX > 0) {
      currentX = 0;
      currentY += rowHeight;
      rowHeight = 0;
    }
    
    // Adjust dimensions to fit remaining space if needed
    const remainingWidth = maxRowWidth - currentX;
    const remainingHeight = height - currentY;
    
    if (rectWidth > remainingWidth) {
      rectWidth = remainingWidth;
    }
    if (rectHeight > remainingHeight) {
      rectHeight = remainingHeight;
    }
    
    rects.push({
      x: currentX,
      y: currentY,
      width: rectWidth,
      height: rectHeight,
      item,
      percentage
    });
    
    currentX += rectWidth;
    rowHeight = Math.max(rowHeight, rectHeight);
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