export const pages = [
  { title: "home", href: "/" },
  { title: "luxry", href: "properties/luxury" },
  { title: "flats", href: "properties/flats" },
  { title: "self contain", href: "properties/self-contain" },
  { title: "single", href: "properties/single" },
  { title: "others", href: "properties/others" },
  { title: "Room mates", href: "roommate/rooms" },
];

export const Features = [
  "Fitted Kitchen with accessories",
  "Secure Estate",
  "Modern Day POP Ceiling",
  "Green Area",
  "Detailed finishing",
  "Pendant lighting & Chandeliers",
  "Wardrobes",
  "TV Console",
  "Water heater",
  "Swimming pool",
  "Heat extractor",
  "CCtv Camera",
  "Close proximity to road",
  "Internet access",
  "Conducive Environment",
  "Close to central market",
  "Adequate Security",
  "Quiet Surrounding",
];

export const countryStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Abuja",
];

export const api = "http://localhost:4000/";
// export const api = "https://api.gethomly.com/";

export const setUser = (data) => {
  const { token, user } = data;
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("user", JSON.stringify(user));
};

export const formatDate = (date) => {
  return `${new Date(date).toLocaleDateString("en-US", {
    month: "short",
  })}, ${new Date(date).toLocaleDateString("en-US", { year: "numeric" })}`;
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

      return token;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null;
    return token;
  } else {
    return null;
  }
}

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");
const hours = currentDate.getHours().toString().padStart(2, "0");
const minutes = currentDate.getMinutes().toString().padStart(2, "0");
const seconds = currentDate.getSeconds().toString().padStart(2, "0");

export const getDate = () => {
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
};
// After (to check if localStorage is available)
// const data = typeof window !== 'undefined' ? localStorage.getItem('someKey') : null;

// DON DELETE THIS PLEASE:
// Number(e.target.value) > (10 / 100) * HPPrice
// ? (10 / 100) * HPPrice
// : Number(e.target.value)
// Number(e.target.value) > (10 / 100) * HPPrice
// ? HPPrice + (10 / 100) * HPPrice
// : Number(e.target.value) + HPPrice
