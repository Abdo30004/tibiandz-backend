export interface Admin {
  name: string;
  email: string;
  password: string;
}

export interface Logo {
  name: string;
  description: string;
  approved: boolean;
  fileId: string;
  label: "new" | "old" | "none";
  tags: string[];
}
