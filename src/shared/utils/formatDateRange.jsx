export default function formatDateRange(startDate, endDate) {
  // Parse the input date strings into Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Define arrays for month names and day names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Helper function to format the date as "Mon 10" or "Nov 17"
  function formatDate(date) {
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
  }

  // If the start and end dates are in the same month, format as "Nov 12 – 13"
  if (start.getMonth() === end.getMonth()) {
    return `${formatDate(start)} – ${end.getDate()}`;
  }

  // If the start and end dates are in different months, format as "Nov 17 – Dec 14"
  return `${formatDate(start)} – ${formatDate(end)}`;
}
