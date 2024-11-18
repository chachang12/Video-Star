export const formatDuration = (duration: string) => {
    duration = duration.replace(/\./g, ':');
    const parts = duration.split(':').map(part => part.replace(/^0+/, '') || '0');
    while (parts.length > 1 && parts[0] === '0') {
      parts.shift();
    }
    return parts.join(':');
};

export const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
};

export const bytesToMb = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2);
};