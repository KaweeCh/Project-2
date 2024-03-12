export interface User {
  userID: number;
  username: string;
  password: string;
  image: string;
  type: string;
  email: string;
}

export interface Register {
  username: string,
  password: string,
  email: string
}

export interface imageUpload {
  imageID: number;
  url: string;
  uploadDate: Date;
  count: number;
  userID: number;
}

export interface imageUser {
  imageID: number;
  url: string;
  count: number;
  username: number;
  userID : number;
}

export interface Vote {
  elorating: number;
  userID: number;
  imageID: number;
}

export interface Statistic {
  id: number;
  voteScore: number;
  date: Date;
  imageID : number;
 
}
