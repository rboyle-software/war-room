import { Coordinates } from '@war-room/shared-types';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @returns distance in meters
 */
export function calculateDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const R = 6371000; // Earth's radius in meters
  const lat1Rad = (coord1.latitude * Math.PI) / 180;
  const lat2Rad = (coord2.latitude * Math.PI) / 180;
  const deltaLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const deltaLng = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Check if a coordinate is within a radius of another coordinate
 */
export function isWithinRadius(
  center: Coordinates,
  point: Coordinates,
  radiusMeters: number
): boolean {
  return calculateDistance(center, point) <= radiusMeters;
}

/**
 * Format coordinates for display
 */
export function formatCoordinates(coord: Coordinates): string {
  return `${coord.latitude.toFixed(6)}, ${coord.longitude.toFixed(6)}`;
}
