export default function getPublishedYear(publishedDate) {
  if (!publishedDate) return "N/A";
  const year = new Date(publishedDate).getFullYear();
  return isNaN(year) ? "N/A" : year;
}
