export type PlatformCreateBusinessBody = {
  business: {
    name: string;
    phone: string;
    email?: string | null;
    notes?: string | null;
  };
  ownerUser: {
    email: string;
    password: string;
    role?: 'ADMIN' | 'PYME';
    isActive?: boolean;
  };
};

export type PlatformListBusinessesQuery = {
  search?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'ALL';
  page?: number;
  limit?: number;
};
