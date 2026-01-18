export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  placeId: string;
  name: string;
  address: string;
  location: Coordinates;
  types: string[];
  rating?: number;
  priceLevel?: number;
  openNow?: boolean;
  photoReference?: string;
}

export interface EnrichedLocation extends Location {
  ownership?: OwnershipInfo;
}

export interface OwnershipInfo {
  bbl: string;
  ownerName: string;
  ownerType: OwnerType;
  buildingClass?: string;
  yearBuilt?: number;
  numFloors?: number;
  lotArea?: number;
  buildingArea?: number;
}

export type OwnerType =
  | 'INDIVIDUAL'
  | 'CORPORATE'
  | 'LLC'
  | 'TRUST'
  | 'GOVERNMENT'
  | 'NONPROFIT'
  | 'UNKNOWN';
