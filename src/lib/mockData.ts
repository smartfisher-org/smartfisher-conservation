export interface DashboardData {
  metrics: {
    speciesCount: number;
    totalFish: number;
    invasivePercent: number;
    cameraHealth: number;
    shannonDiversity: number;
  };
  alerts: Array<{
    id: string;
    type: 'warning' | 'error' | 'info';
    title: string;
    message: string;
    timestamp: string;
  }>;
  charts: {
    speciesRichness: Array<{ date: string; value: number }>;
    shannonIndex: Array<{ date: string; value: number }>;
    speciesCount: Array<{ name: string; value: number; children?: Array<{ name: string; value: number; invasive?: boolean }> }>;
    invasiveSpecies: Array<{ date: string; native: number; invasive: number }>;
  };
  unidentifiedSpecies: Array<{
    id: string;
    image: string;
    timestamp: string;
    location: string;
    confidenceScore: number;
    detectedFeatures: string[];
  }>;
}

export const mockDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    metrics: {
      speciesCount: 47,
      totalFish: 1423,
      invasivePercent: 8.3,
      cameraHealth: 94.2,
      shannonDiversity: 3.5,
    },
    alerts: [
      {
        id: '1',
        type: 'warning',
        title: 'Invasive Species Detected',
        message: 'Lionfish detected in Coral Reef Tank A',
        timestamp: '2 minutes ago'
      },
      {
        id: '2', 
        type: 'error',
        title: 'Camera Offline',
        message: 'Camera 3 in Deep Sea Tank C is not responding',
        timestamp: '15 minutes ago'
      },
      {
        id: '3',
        type: 'info',
        title: 'Weekly Report Ready',
        message: 'Biodiversity report for week 48 is available',
        timestamp: '1 hour ago'
      }
    ],
    charts: {
      speciesRichness: [
        { date: '2024-01-01', value: 42 },
        { date: '2024-01-02', value: 45 },
        { date: '2024-01-03', value: 43 },
        { date: '2024-01-04', value: 47 },
        { date: '2024-01-05', value: 46 },
        { date: '2024-01-06', value: 48 },
        { date: '2024-01-07', value: 47 },
      ],
      shannonIndex: [
        { date: '2024-01-01', value: 2.1 },
        { date: '2024-01-02', value: 2.3 },
        { date: '2024-01-03', value: 2.2 },
        { date: '2024-01-04', value: 2.5 },
        { date: '2024-01-05', value: 2.4 },
        { date: '2024-01-06', value: 2.6 },
        { date: '2024-01-07', value: 2.5 },
      ],
      speciesCount: [
        {
          name: 'Marine Species',
          value: 109,
          children: [
            { name: 'Pink salmon (Oncorhynchus gorbuscha)', value: 60, invasive: true },
            { name: 'Arctic charr (Salvelinus alpinus)', value: 10, invasive: false },
            { name: 'Atlantic salmon (Salmo salar)', value: 12, invasive: false },
            { name: 'Brown trout (Salmo trutta)', value: 7, invasive: false },
            { name: 'European flounder (Platichthys flesus)', value: 20, invasive: false },
          ]
        }
      ],
      invasiveSpecies: [
        { date: '2024-01-01', native: 89, invasive: 11 },
        { date: '2024-01-02', native: 88, invasive: 12 },
        { date: '2024-01-03', native: 87, invasive: 13 },
        { date: '2024-01-04', native: 85, invasive: 15 },
        { date: '2024-01-05', native: 84, invasive: 16 },
        { date: '2024-01-06', native: 83, invasive: 17 },
        { date: '2024-01-07', native: 82, invasive: 18 },
      ],
    },
    unidentifiedSpecies: [
      {
        id: '1',
        image: '/src/assets/live-feed.jpg',
        timestamp: '2024-01-07 14:32:15',
        location: 'Coral Reef Tank A',
        confidenceScore: 0.45,
        detectedFeatures: ['elongated body', 'striped pattern', 'medium size']
      },
      {
        id: '2',
        image: '/src/assets/live-feed.jpg',
        timestamp: '2024-01-07 13:28:42',
        location: 'Deep Sea Tank C',
        confidenceScore: 0.38,
        detectedFeatures: ['rounded fins', 'mottled coloration', 'bottom dweller']
      },
      {
        id: '3',
        image: '/src/assets/live-feed.jpg',
        timestamp: '2024-01-07 12:15:33',
        location: 'Coastal Zone B',
        confidenceScore: 0.42,
        detectedFeatures: ['large eyes', 'transparent fins', 'schooling behavior']
      },
      {
        id: '4',
        image: '/src/assets/live-feed.jpg',
        timestamp: '2024-01-07 11:45:18',
        location: 'Coral Reef Tank A',
        confidenceScore: 0.35,
        detectedFeatures: ['unusual coloration', 'asymmetric fins', 'nocturnal']
      }
    ],
  };
};