
import { DayItinerary, Restaurant, DisneyStrategy, FlightInfo, AccommodationInfo, TicketInfo } from '../types';

export const FLIGHT_DATA: FlightInfo = {
  airline: "國泰航空 Cathay Pacific",
  flightNo: "CX450",
  departure: "TPE 12:50",
  arrival: "NRT 16:50",
  terminal: "NRT Terminal 2",
  gate: "62"
};

export const HOTEL_DATA: AccommodationInfo = {
  name: "里士滿東京押上飯店 (Richmond Hotel Premier)",
  address: "131-0045 東京都墨田區押上1-10-3",
  checkIn: "15:00",
  shuttleInfo: "押上站 B3 出口對面，步行 1 分鐘即可抵達。",
  usageGuide: "大廳位於 5 樓。飯店 1-3 樓有大型超市 Life，營業至深夜。"
};

export const TICKETS: TicketInfo[] = [
  {
    id: "tk-subway",
    title: "東京地鐵 72 小時周遊券",
    code: "QR Code 兌換",
    type: "JR",
    details: "可無限次搭乘東京地鐵與都營地下鐵全線。",
    shuttleLocation: "地鐵各主要車站的紅色標誌售票機",
    usage: "將 QR Code 對準售票機感應器即可領取實體票卡。"
  },
  {
    id: "tk-flight-price",
    title: "機票與住宿總額",
    code: "NT$ 40,599",
    type: "HOTEL",
    details: "機票 24,827 + 飯店 15,772 (2人)",
    shuttleLocation: "國泰航空 CX450/451",
    usage: "飯店含 4 晚稅金。"
  }
];

export const ITINERARY_DATA: DayItinerary[] = [
  {
    day: 1,
    date: "2026-10-15",
    locationName: "押上 / 晴空塔",
    coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800",
    summary: "抵達東京後的首站，沉浸在晴空塔的夜色與押上下町的靜謐氛圍中。",
    weather: { 
      temp: "21°C", 
      condition: "秋意漸濃", 
      icon: "🌇",
      forecast24h: [
        { time: "17:00", temp: "21°", icon: "🌤️" },
        { time: "19:00", temp: "19°", icon: "🌙" },
        { time: "21:00", temp: "17°", icon: "✨" },
        { time: "23:00", temp: "16°", icon: "✨" },
        { time: "08:00", temp: "15°", icon: "☀️" },
      ]
    },
    items: [
      {
        id: "d1-1",
        startTime: "16:50",
        endTime: "18:30",
        location: "成田機場 T2",
        activity: "入境與搭車往押上",
        type: "transport",
        transportInfo: { method: "京成成田 Skyaccess", duration: 55 },
        reason: "Access Express 可直達押上站，無需在青砥轉車，對行李多的旅客最方便。",
        planB: "Skyliner 至上野再轉地鐵",
        tags: ["預約代號: CX450", "地鐵券兌換"],
        trivia: "成田機場 T2 曾是亞洲最大的單一航廈建築。",
        officialSite: "https://www.keisei.co.jp/keisei/tetudou/skyliner/tc/traffic/index.php"
      }
    ]
  },
  {
    day: 2,
    date: "2026-10-16",
    locationName: "淺草 / 仲見世通",
    coverImage: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=800",
    summary: "穿梭淺草雷門的紅燈籠與古早味巷弄，感受江戶時代的江戶情緒。",
    weather: { 
      temp: "19°C", 
      condition: "和煦陽光", 
      icon: "🌤️",
      forecast24h: [
        { time: "08:00", temp: "16°", icon: "🌤️" },
        { time: "12:00", temp: "19°", icon: "☀️" },
        { time: "16:00", temp: "18°", icon: "☀️" },
        { time: "20:00", temp: "15°", icon: "🌙" },
      ]
    },
    items: [
      {
        id: "d2-1",
        startTime: "09:30",
        endTime: "12:00",
        location: "淺草寺 / 雷門",
        activity: "參拜與仲見世通漫步",
        type: "sightseeing",
        transportInfo: { method: "都營淺草線", duration: 3 },
        reason: "從押上搭淺草線僅需 1 站，建議早點去避開大批觀光團。",
        planB: "隅田公園散步",
        tags: ["龜屋人形燒", "今半壽喜燒"],
        trivia: "雷門左側是雷神，右側是風神，正式名稱為『風雷神門』。",
        officialSite: "https://www.senso-ji.jp/"
      }
    ]
  }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: "r-rikyu",
    name: "利久牛舌",
    priceLevel: "¥¥",
    reservation: false,
    suggestedTime: "19:30",
    highlight: "來自仙台的炭火燒牛舌名店，肉質 Q 彈厚實。",
    mustOrder: ["極厚切牛舌定食", "牛尾湯"],
    recommendedMenu: ["牛舌燉肉", "山藥泥配麥飯"],
    location: "晴空塔 Solamachi 6 樓",
    officialUrl: "https://www.gnavi.co.jp/rikyu/"
  }
];

export const DISNEY_STRATEGY: DisneyStrategy = {
  earlyEntry: ["07:30 抵達舞濱車站", "建議 08:00 前完成安檢排隊"],
  priorityOrder: ["美女與野獸：城堡奇緣", "杯麵的歡樂乘車", "太空山"],
  crowdLogic: "陸地樂園占地廣大，熱門設施集中在右側及後方。建議優先預約 DPA 設施以節省體力。",
  warningArea: "遊行期間熱門通道會封閉，若不看遊行建議提早跨區移動至後方夢幻樂園區域。"
};
