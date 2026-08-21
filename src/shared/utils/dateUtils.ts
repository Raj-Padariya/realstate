/**
 * Dynamic date & time formatter for property listings ("Posted on").
 * Shows human-friendly relative time (e.g. "Just now", "2 hours ago", "3 days ago", "2 weeks ago")
 * and shifts to exact date format (e.g. "05 Aug 2026") after 15-30 days.
 */
export function formatPostedOn(dateInput?: Date | string | number): string {
  if (!dateInput) return 'Today';

  let date: Date;
  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === 'number') {
    date = new Date(dateInput);
  } else if (typeof dateInput === 'string') {
    // If it's already a relative phrase like "Just now", "Today", parse or fallback
    const parsed = new Date(dateInput);
    if (!isNaN(parsed.getTime())) {
      date = parsed;
    } else {
      return dateInput;
    }
  } else {
    return 'Today';
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);

  // Future or invalid date protection
  if (diffSecs < 0) {
    return 'Just now';
  }

  // < 1 hour
  if (diffMins < 5) {
    return 'Just now';
  }
  if (diffMins < 60) {
    return `${diffMins} mins ago`;
  }

  // < 24 hours
  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  }

  // < 7 days
  if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }

  // < 30 days (1-4 weeks)
  if (diffDays <= 30) {
    return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
  }

  // > 30 days: Format exact date (e.g., "15 Jul 2026")
  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
