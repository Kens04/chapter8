export type Post = {
  id: number;
  thumbnailUrl: string;
  createdAt: Date;
  categories: string[];
  title: string;
  content: string;
};

export type PostResponse = {
  post: Post;
};

export type PostsResponse = {
  posts: Post[];
};