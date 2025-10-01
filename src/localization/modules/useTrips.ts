import { useNotifications } from '../../composables/useNotifications.ts';
import { apiRequest } from '../../api/request.ts';
import type { Trip } from '../../types.ts';
import { API } from '../../constants.ts';

export function useTrips() {
  const { errorNotify } = useNotifications();

  async function fetchTrips() {
    try {
      return await apiRequest<Trip[]>(API.Trips, { method: 'GET' }).then(data => data.data);
    } catch (e: any) {
      errorNotify(e.message);
      return [];
    }
  }

  return {
    fetchTrips,
  };
}
