export interface Post {
    id: number;
    userName: string;
    userImage: string;
    content: string;
    liked: boolean;
    likes: number;
    shares: number;
    image?: string | null;
    video?: string | null;
    timestamp: string;
    comments: Array<{ id: number; text: string }>;
  }
  
  export interface FilePreview {
    url: string;
    type: string;
  }
  