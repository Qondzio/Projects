const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();

    if (diff < 0) return "Just now";

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;

    return `${days} days ago`;
};

export default timeAgo