import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function flattenObject(obj, parentKey = "", separator = ".") {
  let result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}${separator}${key}` : key;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        // Recursively flatten nested objects
        Object.assign(result, flattenObject(obj[key], newKey, separator));
      } else {
        // Add the value to the result
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}

export function formatDateTimeUTC(isoString) {
  const date = new Date(isoString);

  // Get UTC date parts
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();

  // Format UTC time parts
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${day} ${month}, ${year} - Time: ${hours}:${minutes}${ampm}`;
}

export const getCookie = (name) => {
  const cookieString = document.cookie;
  if (!cookieString) {
    return null;
  }
  const cookies = cookieString.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return cookies;
};
