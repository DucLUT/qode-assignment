export interface Photo {
    id: number;
    filename: string;
    url: string;
    caption?: string;
    created_at: Date;
    comments?: Comment[];
}