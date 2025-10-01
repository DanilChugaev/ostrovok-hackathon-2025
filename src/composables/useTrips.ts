import { useNotifications } from './useNotifications.ts';
import { apiRequest } from '../api/request.ts';
import type { Trip } from '../types.ts';
import { API } from '../constants.ts';

export function useTrips() {
  const { errorNotify } = useNotifications();

  async function fetchTrips(userId: number) {
    try {
      return await apiRequest<Trip[]>(`${API.Trips}?userId=${userId}`, { method: 'GET' }).then(
        data => data.data,
      );
    } catch (e: any) {
      errorNotify(e.message);
      return [];
    }
  }

  async function createTrip(userId: number, hotelId: number) {
    try {
      return await apiRequest<Trip>(API.TripCreate, {
        method: 'POST',
        body: {
          userId,
          hotelId,
        },
      }).then(data => data.data);
    } catch (e: any) {
      errorNotify(e.message);
      return null;
    }
  }

  return {
    fetchTrips,
    createTrip,
  };
}
