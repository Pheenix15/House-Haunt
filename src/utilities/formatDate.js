
export const formatDate = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 7) return `${days} days ago`;

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};


// Reusable compact number formatter (200K, 1.2M, etc.)
const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short"
});

export const formatNumber = (value) => {
  if (value === null || value === undefined) return "—";
  return compactFormatter.format(value);
};