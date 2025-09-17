export type SubdomainData = {
  emoji: string;
  createdAt: number;
};

export type Tenant = {
  subdomain: string;
  emoji: string;
  createdAt: number;
};

export type CreateState = {
  error?: string;
  success?: boolean;
  subdomain?: string;
  icon?: string;
};

export type DeleteState = {
  error?: string;
  success?: string;
};
