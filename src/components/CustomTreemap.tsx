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

// Simple treemap algorithm using squarified layout
const squarify = (data: TreemapItem[], width: number, height: number) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const area = width * height;
  
  const rects: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    item: TreemapItem;
    percentage: number;
  }> = [];
  
  let x = 0;
  let y = 0;
  let remainingWidth = width;
  let remainingHeight = height;
  
  data.forEach((item, index) => {
    const itemArea = (item.value / total) * area;
    const percentage = (item.value / total) * 100;
    
    // Simple layout algorithm - can be improved with proper squarified treemap
    let rectWidth, rectHeight;
    
    if (index === 0) {
      // First item takes a portion based on its relative size
      if (width > height) {
        rectWidth = Math.sqrt(itemArea * (width / height));
        rectHeight = itemArea / rectWidth;
      } else {
        rectHeight = Math.sqrt(itemArea * (height / width));
        rectWidth = itemArea / rectHeight;
      }
    } else {
      // Subsequent items fill remaining space
      const remainingItems = data.length - index;
      const remainingValue = data.slice(index).reduce((sum, item) => sum + item.value, 0);
      const remainingArea = (remainingValue / total) * area;
      
      if (remainingWidth > remainingHeight) {
        rectWidth = remainingWidth / remainingItems;
        rectHeight = itemArea / rectWidth;
      } else {
        rectHeight = remainingHeight / remainingItems;
        rectWidth = itemArea / rectHeight;
      }
    }
    
    // Ensure dimensions don't exceed available space
    rectWidth = Math.min(rectWidth, remainingWidth);
    rectHeight = Math.min(rectHeight, remainingHeight);
    
    rects.push({
      x,
      y,
      width: rectWidth,
      height: rectHeight,
      item,
      percentage
    });
    
    // Update position for next rectangle
    if (width > height) {
      x += rectWidth;
      remainingWidth -= rectWidth;
    } else {
      y += rectHeight;
      remainingHeight -= rectHeight;
    }
  });
  
  return rects;
};

export default function CustomTreemap({ data, width, height }: CustomTreemapProps) {
  const rectangles = squarify(data, width, height);
  
  return (
    <svg width={width} height={height} className="overflow-hidden">
      {rectangles.map((rect, index) => {
        const bgColor = rect.item.invasive ? '#dc2626' : '#16a34a'; // red-600 : green-600
        const textColor = 'white';
        const canShowText = rect.width > 120 && rect.height > 60;
        
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