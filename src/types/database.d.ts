export declare interface Admin {
  _id: string;
  name: string;
  email: string;
  password: string;
}

interface ApiResponse<T> {
  data: T
  message: string;
  success: boolean;
}



export declare interface Logo {
  _id: string;
  name: string;
  description: string;
  email: string;
  author: string;
  approved: boolean;
  fileId: string;
  label: 'new' | 'old' | 'none';
  tags: string[];
}

export declare interface File {
  _id: string;
  name: string;
  link: string;
  type: 'svg' | 'ai' | 'eps';
  size: number;
}
