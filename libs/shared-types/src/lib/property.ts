import { Coordinates } from './location';

export interface Property {
  id: string;
  bbl: string;
  boroughCode: string;
  block: number;
  lot: number;
  address: string;
  houseNumber?: string;
  streetName?: string;
  zipCode?: string;
  buildingClass?: string;
  landUse?: string;
  yearBuilt?: number;
  numFloors?: number;
  unitsTotal?: number;
  unitsResidential?: number;
  lotArea?: number;
  buildingArea?: number;
  zoningDistrict1?: string;
  centroid?: Coordinates;
}

export interface PropertyOwner {
  propertyId: string;
  ownerId: string;
  ownershipPercentage?: number;
  ownershipType?: string;
  documentId?: string;
  documentDate?: string;
  documentType?: string;
}
