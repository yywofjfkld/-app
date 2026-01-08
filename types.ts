
export enum TabType {
  HOME = 'HOME',
  SCHEDULE = 'SCHEDULE',
  FOOD = 'FOOD',
  DISNEY = 'DISNEY',
  TICKETS = 'TICKETS'
}

export interface ItineraryItem {
  id: string;
  startTime: string;
  endTime: string;
  location: string;
  activity: string;
  type: 'transport' | 'sightseeing' | 'food' | 'rest';
  transportInfo?: {
    method: string;
    duration: number; // minutes
  };
  reason: string;
  planB: string;
  tags?: string[];
  tips?: string;
  trivia?: string; // AI generated trivia
  officialSite?: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  locationName: string;
  coverImage: string; // 代表當日行程的視覺圖
  summary: string; // 簡短摘要
  items: ItineraryItem[];
  weather: {
    temp: string;
    condition: string;
    icon: string;
    forecast24h: { time: string; temp: string; icon: string }[];
  };
}

export interface Restaurant {
  id: string;
  name: string;
  priceLevel: '¥' | '¥¥' | '¥¥¥';
  reservation: boolean;
  suggestedTime: string;
  highlight: string;
  mustOrder: string[];
  recommendedMenu?: string[];
  location: string;
  officialUrl?: string;
}

export interface FlightInfo {
  airline: string;
  flightNo: string;
  departure: string;
  arrival: string;
  gate?: string;
  terminal: string;
}

export interface AccommodationInfo {
  name: string;
  address: string;
  checkIn: string;
  shuttleInfo: string;
  usageGuide: string;
}

export interface TicketInfo {
  id: string;
  title: string;
  code: string;
  type: 'JR' | 'NEX' | 'DISNEY' | 'HOTEL';
  details: string;
  shuttleLocation: string;
  usage: string;
}

export interface DisneyStrategy {
  earlyEntry: string[];
  priorityOrder: string[];
  crowdLogic: string;
  warningArea: string;
}
