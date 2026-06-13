/**
 * Format a number count into a human-readable string.
 * e.g. 1200 → "1.2K", 1500000 → "1.5M"
 */
export const formatCount = (count: number): string => {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1) + "M";
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(1) + "K";
  }
  return count.toString();
};
