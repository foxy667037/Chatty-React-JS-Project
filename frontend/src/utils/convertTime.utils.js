export function ConvertTime(isoDate) {
    if (!isoDate) return "";
  
    const date = new Date(isoDate);
  
    const options = {
      timeZone: "Asia/Karachi", 
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
  
    return new Intl.DateTimeFormat("en-PK", options).format(date);
  }
  