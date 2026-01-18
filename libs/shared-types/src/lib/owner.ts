import { OwnerType } from './location';

export interface Owner {
  id: string;
  name: string;
  nameNormalized: string;
  ownerType: OwnerType;
  businessAddress?: string;
  propertyCount?: number;
}

export interface OwnerSearchResult {
  owners: Owner[];
  totalCount: number;
}
