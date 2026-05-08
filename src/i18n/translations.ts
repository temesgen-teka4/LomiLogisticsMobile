export type Locale = 'en' | 'am';

// 1. Expanded Interface to match ALL screens
export interface TranslationSet {
  // Auth & Global
  noJobs: string;
  goOnlineHint: string;
  login: string;
  welcome: string;
  online: string;
  offline: string;
  search: string;
  view: string;
  
  // Navigation & Details
  currentStatus: string;
  confirmDelivery: string;
  receiverName: string;
  receiverNameError: string;
  tapToNav: string;
  call: string;
  message: string;
  cancel: string;
  confirm: string;

  // History Screen (ADDED THESE TO FIX YOUR ERRORS)
  back: string;
  earningsHistory: string;
  totalEarned: string;
  deliveries: string;
  noHistory: string;
  
  // Profile / Settings
  settings: string;
  rating: string;
  jobs: string;
  accountDetails: string;
  email: string;
  vehicle: string;
  plate: string;
  appPreferences: string;
  notifications: string;
  language: string;
  signOut: string;
}

// 2. Full Record with mapped keys
export const translations: Record<Locale, TranslationSet> = {
  en: {
    goOnlineHint: "Go Online to see jobs",
    noJobs: "No jobs available",
    login: "Login",
    welcome: "Welcome back",
    online: "ONLINE",
    offline: "OFFLINE",
    search: "Search tasks...",
    view: "View",
    
    currentStatus: "Current Status",
    confirmDelivery: "Confirm Delivery",
    receiverName: "Receiver Name",
    receiverNameError: "Please enter a valid name",
    tapToNav: "Tap for Navigation",
    call: "Call",
    message: "Message",
    cancel: "Cancel",
    confirm: "Confirm",

    // History Screen English
    back: "Back",
    earningsHistory: "Earnings History",
    totalEarned: "Total Earned",
    deliveries: "Deliveries",
    noHistory: "No earnings history yet",

    settings: "Settings",
    rating: "Rating",
    jobs: "Jobs",
    accountDetails: "Account Details",
    email: "Email",
    vehicle: "Vehicle",
    plate: "License Plate",
    appPreferences: "App Preferences",
    notifications: "Notifications",
    language: "Language",
    signOut: "Sign Out",
  },
  am: {
    goOnlineHint: "ስራዎችን ለማየት ወደ መስመር ይግቡ",
    noJobs: "ምንም ስራ የለም",
    login: "ይግቡ",
    welcome: "እንኳን ደህና መጡ",
    online: "ክፍት",
    offline: "ዝግ",
    search: "ፍለጋ...",
    view: "ተመልከት",
    
    currentStatus: "የአሁኑ ሁኔታ",
    confirmDelivery: "ርክክብ ያረጋግጡ",
    receiverName: "የተቀባይ ስም",
    receiverNameError: "እባክዎ ትክክለኛ ስም ያስገቡ",
    tapToNav: "ለካርታ እዚህ ይጫኑ",
    call: "ደውል",
    message: "መልዕክት",
    cancel: "ሰርዝ",
    confirm: "አረጋግጥ",

    // History Screen Amharic
    back: "ተመለስ",
    earningsHistory: "የገቢ ታሪክ",
    totalEarned: "ጠቅላላ ገቢ",
    deliveries: "ርክክቦች",
    noHistory: "ምንም የገቢ ታሪክ የለም",

    settings: "ቅንብሮች",
    rating: "ደረጃ",
    jobs: "ስራዎች",
    accountDetails: "የመለያ ዝርዝሮች",
    email: "ኢሜል",
    vehicle: "ተሽከርካሪ",
    plate: "የሰሌዳ ቁጥር",
    appPreferences: "ምርጫዎች",
    notifications: "ማሳወቂያዎች",
    language: "ቋንቋ",
    signOut: "ውጣ",
  }
};

export type TranslationKey = keyof TranslationSet;