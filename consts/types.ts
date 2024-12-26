export type CategoryType = {
  id: string;
  img: string;
  title: string;
  slug: string;
};

export type PostType = {
  count: number;
  posts: {
    id: string;
    title: string;
    desc: string;
    img: string;
    views: number;
    catSlug: string;
    cat: CategoryType;
    userEmail: string;
    user: UserType;
    comments: CommentType[];
    createdAt: Date;
    slug: string;
  }[];
};

export type SinglePostType = {
  id: string;
  title: string;
  desc: string;
  img: string;
  views: number;
  catSlug: string;
  cat: CategoryType;
  userEmail: string;
  user: UserType;
  comments: CommentType[];
  createdAt: Date;
  slug: string;
};
export type PostArrayType = PostType['posts'];

export type CommentType = {
  id: string;
  createdAt: string;
  desc: string;
  userEmail: string;
  user: UserType;
  postSlug: string;
  post: SinglePostType;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  accounts: AccountType[];
  sessions: SessionType[];
  Post: PostType[];
  Comment: CommentType[];
};

export type AccountType = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  id_token: string;
  session_state: string;
};

export type SessionType = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: UserType;
};
