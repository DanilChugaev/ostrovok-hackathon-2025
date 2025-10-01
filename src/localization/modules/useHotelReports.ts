import { useNotifications } from '../../composables/useNotifications.ts';
import { useRouter } from 'vue-router';
import { apiRequest } from '../../api/request.ts';
import type { HotelReportResponse } from '../../types.ts';
import { API, PAGES } from '../../constants.ts';

export function useHotelReports() {
  const { errorNotify } = useNotifications();
  const router = useRouter();

  async function fetchHotelReportById(id: number): Promise<HotelReportResponse | null> {
    try {
      const result = await apiRequest<HotelReportResponse>(`${API.HotelReport}?id=${id}`, {
        method: 'GET',
      }).then(data => data.data);

      if (!result) {
        router.push(PAGES.HotelReports);
      }

      return result;
    } catch (e: any) {
      errorNotify(e.message);
      return null;
    }
  }

  async function fetchHotelReports(userId: number) {
    try {
      return await apiRequest<HotelReportResponse[]>(`${API.HotelReports}?userId=${userId}`, {
        method: 'GET',
      }).then(data => data.data);
    } catch (e: any) {
      errorNotify(e.message);
      return [];
    }
  }

  async function createHotelReport(userId: number, tripId: number) {
    try {
      const report = await apiRequest<HotelReportResponse>(`${API.HotelReportCreate}`, {
        method: 'POST',
        body: {
          userId,
          tripId,
        },
      }).then(data => data.data);

      goToHotelReportPage(report.id);
    } catch (e: any) {
      errorNotify(e.message);
    }
  }

  function goToHotelReportPage(reportId: number) {
    router.push(`${PAGES.HotelReport}/${reportId}`);
  }

  return {
    fetchHotelReportById,
    fetchHotelReports,
    createHotelReport,
    goToHotelReportPage,
  };
}
