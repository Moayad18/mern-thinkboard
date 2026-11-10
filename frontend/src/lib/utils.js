export function formatDate(date) {
  const vaildDate = new Date(date);
  return vaildDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
