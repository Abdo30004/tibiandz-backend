export interface Admin {
  name: string;
  email: string;
  password: string;
}

export interface Logo {
  name: string;
  description: string;
  email: string;
  author: string;
  approved: boolean;
  fileId: string;
  label: "new" | "old" | "none";
  tags: string[];
}

export interface File {
  name: string;
  link: string;
  type: "svg" | "ai" | "eps";
  size: number;
}
