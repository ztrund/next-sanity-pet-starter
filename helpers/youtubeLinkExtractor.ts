export const extractYoutubeVideoId = (url: string | undefined): string => {
    if (!url) {
        return "";
    }

    const videoRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const videoMatch = url.match(videoRegex);

    if (videoMatch && videoMatch[2].length === 11) {
        return videoMatch[2];
    }

    return "";
};

export const extractYoutubeChannelId = (url: string | undefined): string => {
    if (!url) {
        return "";
    }

    const channelRegex = /^.*(youtube.com\/channel\/|youtube.com\/c\/|youtube.com\/user\/)([^#&?]*).*/;
    const channelMatch = url.match(channelRegex);

    if (channelMatch && channelMatch[2].length > 0) {
        return channelMatch[2];
    }

    return "";
};
