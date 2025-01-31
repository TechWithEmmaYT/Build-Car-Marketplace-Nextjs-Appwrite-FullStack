import { CarType } from "@/@types/index.type";

export const cars: CarType[] = [
  {
    id: "EJIURURURUR",
    image: "/images/hero-car.png",
    name: "BMW M4 Competition",
    type: "Coupe",
    price: "$266,500",
    fuelType: "Petrol",
    speed: 290,
    condition: "New",
    transmission: "Automatic",
  },
  {
    id: "r98fjkewjrek",
    image: "/images/hero-car.png",
    name: "Toyota GR Supra",
    type: "Sport Car",
    price: "$185,000",
    fuelType: "Petrol",
    speed: 250,
    condition: "Used",
    transmission: "Manual",
  },
  {
    id: "j8f93jf93fj9",
    image: "/images/hero-car.png",
    name: "BMW i4 M50",
    type: "Electric Sedan",
    price: "$205,500",
    fuelType: "Electric",
    speed: 225,
    condition: "New",
    transmission: "Automatic",
  },
  {
    id: "dk39ifj39fj3",
    image: "/images/hero-car.png",
    name: "Tesla Model 3",
    type: "Electric Sedan",
    price: "$175,900",
    fuelType: "Electric",
    speed: 210,
    condition: "Used",
    transmission: "Automatic",
  },
  {
    id: "dk39fjkdkdkd",
    image: "/images/hero-car.png",
    name: "Porsche 911 GT3",
    type: "Sport Car",
    price: "$386,500",
    fuelType: "Petrol",
    speed: 320,
    condition: "New",
    transmission: "Manual",
  },
  {
    id: "dke93jfkd93kf",
    image: "/images/hero-car.png",
    name: "Toyota Camry Hybrid",
    type: "Sedan",
    price: "$98,500",
    fuelType: "Hybrid",
    speed: 180,
    condition: "New",
    transmission: "Automatic",
  },
  {
    id: "eoekdkdkekee",
    image: "/images/hero-car.png",
    name: "Mercedes-Benz EQS",
    type: "Luxury Electric",
    price: "$295,000",
    fuelType: "Electric",
    speed: 240,
    condition: "New",
    transmission: "Automatic",
  },
  {
    id: "dkekdkkdkekd",
    image: "/images/hero-car.png",
    name: "Audi RS6 Avant",
    type: "Sport Wagon",
    price: "$315,500",
    fuelType: "Petrol",
    speed: 280,
    condition: "Used",
    transmission: "Automatic",
  },
];

export const carFeatures = {
  "Air Conditioning": true,
  "Power Windows": true,
  "Power Locks": true,
  "Power Steering": true,
  "Anti-lock Brakes (ABS)": true,
  "Driver Airbag": true,
  "Passenger Airbag": true,
  "Alloy Wheels": true,
  "Sunroof/Moonroof": true,
  "Leather Seats": true,
  "Navigation System": true,
  "Premium Sound System": true,
  "Keyless Entry": false,
  "Cruise Control": true,
  "Backup Camera": false,
  "Bluetooth Connectivity": true,
  "Heated Seats": true,
  "Remote Start": true,
  "Third-row Seating": false,
  "Four-Wheel Drive (4WD)": true,
};

export const CAR_BRAND_OPTIONS = [
  {
    value: "mercedes-benz",
    label: "Mercedes Benz",
  },
  { value: "tesla", label: "Tesla" },
  { value: "lexus", label: "Lexus" },
  { value: "toyota", label: "Toyota" },
  { value: "bmw", label: "BMW" },
  { value: "ford", label: "Ford" },
  { value: "tata", label: "Tata" },
  { value: "audi", label: "Audi" },
  { value: "hyundai", label: "Hyundai" },
];

export const CAR_MODEL_OPTIONS = [
  { key: "mercedes-benz", value: "gle-class", label: "GLE-Class" },
  { key: "mercedes-benz", value: "glk-class", label: "GLK-Class" },
  { key: "mercedes-benz", value: "s-class", label: "S-Class" },
  { key: "tesla", value: "model-s", label: "Model S" },
  { key: "tesla", value: "model-3", label: "Model 3" },
  { key: "tesla", value: "model-x", label: "Model X" },
  { key: "lexus", value: "es300", label: "ES 300" },
  { key: "lexus", value: "rx350", label: "RX 350" },
  { key: "toyota", value: "camry", label: "Camry" },
  { key: "toyota", value: "corolla", label: "Corolla" },
  { key: "toyota", value: "camry-hybrid", label: "Camry Hybrid" },
  { key: "bmw", value: "7-series", label: "7 Series" },
  { key: "bmw", value: "x5", label: "X5" },
  { key: "ford", value: "mustang", label: "Mustang" },
  { key: "ford", value: "f-150", label: "F-150" },
  { key: "tata", value: "nexon", label: "Nexon" },
  { key: "tata", value: "harrier", label: "Harrier" },
  { key: "audi", value: "a4", label: "A4" },
  { key: "audi", value: "a6", label: "A6" },
  { key: "hyundai", value: "accent", label: "Accent" },
  { key: "hyundai", value: "venue", label: "Venue" },
];

export const CAR_CONDITION_OPTIONS = [
  { value: "BRAND_NEW", label: "Brand New" },
  { value: "USED", label: "Used" },
];

export const CAR_FUELTYPE_OPTIONS = [
  { value: "GASOLINE", label: "Gasoline" },
  { value: "DIESEL", label: "Diesel" },
  { value: "ELECTRIC", label: "Electric" },
  { value: "HYBRID", label: "Hybrid" },
];

export const CAR_TRANSMISSION_OPTIONS = [
  { value: "AUTOMATIC", label: "Automatic" },
  { value: "MANUAL", label: "Manual" },
  { value: "CVT", label: "CVT" },
  { value: "AMT", label: "AMT" },
];

export const CAR_COLOR_OPTIONS = [
  {
    value: "white",
    label: "White",
  },
  {
    value: "gray",
    label: "gray",
  },
  {
    value: "black",
    label: "Black",
  },
  {
    value: "red",
    label: "Red",
  },
  {
    value: "blue",
    label: "Blue",
  },
];

export const CAR_YEAR_OPTIONS = [
  { value: "2023", label: "2023" },
  { value: "2020", label: "2020" },
  { value: "2019", label: "2019" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" },
  { value: "2013", label: "2013" },
  { value: "2011", label: "2011" },
];

export const CAR_YEAR_RANGE_OPTIONS = [
  { value: "2011-2013", label: "2011 - 2013" },
  { value: "2015-2017", label: "2015 - 2015" },
  { value: "2019-2020", label: "2019 - 2020" },
  { value: "2021-2023", label: "2021 - 2023" },
];

export const CAR_PRICE_RANGE_OPTIONS = [
  { value: "0-30000", label: "Under 30k" },
  { value: "30000-50000", label: "30 - 50k" },
  { value: "50000-100000", label: "50 - 100k" },
  { value: "custom", label: "Custom" },
];

export const CAR_BODY_TYPE_OPTIONS = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "truck", label: "Truck" },
  { value: "hatchback", label: "Hatchback" },
  { value: "coupe", label: "Coupe" },
  { value: "convertible", label: "Convertible" },
  { value: "van", label: "Van/Minivan" },
  { value: "wagon", label: "Wagon" },
  { value: "other", label: "Other" },
];

export const CAR_DRIVETRAIN_OPTIONS = [
  { value: "FWD", label: "Front-Wheel Drive (FWD)" },
  { value: "RWD", label: "Rear-Wheel Drive (RWD)" },
  { value: "AWD", label: "All-Wheel Drive (AWD)" },
  { value: "4WD", label: "Four-Wheel Drive (4WD)" },
];

export const CAR_SECOND_CONDITION_OPTIONS = [
  { value: "afterCrash", label: "After Crash" },
  { value: "engineIssue", label: "Engine Issue" },
  { value: "gearIssue", label: "Gear Issue" },
  { value: "needBodyRepair", label: "Needs Body Repair" },
  { value: "needRepair", label: "Needs Repair" },
  { value: "needRepainting", label: "Needs Repainting" },
  { value: "tireDamage", label: "Tire Damage" },
  { value: "glassDamage", label: "Glass Damage" },
  { value: "electricalIssue", label: "Electrical Issue" },
  { value: "suspensionIssue", label: "Suspension Issue" },
  { value: "brakeIssue", label: "Brake Issue" },
  { value: "interiorDamage", label: "Interior Damage" },
  { value: "minorWearTear", label: "Minor Wear and Tear" },
  { value: "noFault", label: "No Fault" },
];

export const CAR_KEY_FEATURES_OPTIONS = [
  { value: "sunroof", label: "Sunroof/Moonroof" },
  { value: "navigation", label: "Navigation System" },
  { value: "leatherSeats", label: "Leather Seats" },
  { value: "cooledSeats", label: "Cooled Seats (Ventilated)" },
  { value: "powerSeats", label: "Power Seats" },
  { value: "premiumSound", label: "Premium Sound System" },
  { value: "alloyWheels", label: "Alloy Wheels" },
  { value: "parkingSensors", label: "Parking Sensors" },
  { value: "rearviewCamera", label: "Rearview Camera" },
  { value: "360Camera", label: "360° Camera" },
  { value: "adaptiveCruiseControl", label: "Adaptive Cruise Control" },
  {
    value: "automaticEmergencyBraking",
    label: "Automatic Emergency Braking",
  },
  { value: "bluetooth", label: "Bluetooth Connectivity" },
  { value: "appleCarplay", label: "Apple CarPlay" },
  { value: "androidAuto", label: "Android Auto" },
  { value: "keylessEntry", label: "Keyless Entry" },
  { value: "pushButtonStart", label: "Push Button Start" },
  { value: "remoteStart", label: "Remote Start" },
  { value: "powerLocks", label: "Power Locks" },
  { value: "airConditioning", label: "Air Conditioning" },
];
