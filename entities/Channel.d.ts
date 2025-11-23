import 'reflect-metadata';
export declare class Channel {
    _id: string;
    userId: string;
    profileId?: string;
    name: string;
    description?: string;
    customUrl?: string;
    youtubeChannelId?: string;
    youtubeChannelUrl?: string;
    youtubeChannelTitle?: string;
    youtubeChannelDescription?: string;
    youtubeChannelThumbnail?: string;
    youtubeChannelBanner?: string;
    subscriberCount: number;
    videoCount: number;
    viewCount: number;
    isConnected: boolean;
    accessToken?: string;
    refreshToken?: string;
    tokenExpiresAt?: Date;
    defaultPrivacyStatus: "public" | "unlisted" | "private";
    defaultMadeForKids: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Channel.d.ts.map