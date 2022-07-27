export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  likeCount?: string;
  viewCount?: number;
  favourite: boolean;
  addedDate: Date;
}
