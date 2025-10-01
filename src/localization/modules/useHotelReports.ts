import { useNotifications } from '../../composables/useNotifications.ts';
import { useRouter } from 'vue-router';
import { apiRequest } from '../../api/request.ts';
import type {
  HotelReportCategoryProgress,
  HotelReportCategoryResponse,
  HotelReportCriterion,
  HotelReportResponse,
  HotelReportStageProgress,
  HotelReportStageResponse,
} from '../../types.ts';
import { API, PAGES } from '../../constants.ts';
import { useLocale } from '../../composables/useLocale.ts';

export function useHotelReports() {
  const { errorNotify } = useNotifications();
  const router = useRouter();
  const { t } = useLocale();

  async function fetchHotelReportById(reportId: number): Promise<HotelReportResponse | null> {
    try {
      const result = await apiRequest<HotelReportResponse>(
        `${API.HotelReportById}?reportId=${reportId}`,
        {
          method: 'GET',
        },
      ).then(data => data.data);

      if (!result) {
        router.push(PAGES.HotelReports);
      }

      return result;
    } catch (e: any) {
      errorNotify(e.message);
      return null;
    }
  }

  async function fetchHotelReportStagesByReportId(
    reportId: number,
  ): Promise<HotelReportStageResponse[]> {
    try {
      const result = await apiRequest<HotelReportStageResponse[]>(
        `${API.HotelReportStagesByReportId}?reportId=${reportId}`,
        {
          method: 'GET',
        },
      ).then(data => data.data);

      if (!result) {
        router.push(PAGES.HotelReports);
      }

      return result;
    } catch (e: any) {
      errorNotify(e.message);
      return [];
    }
  }

  async function fetchHotelReportCategoriesByStageId(
    stageId: number,
  ): Promise<HotelReportCategoryResponse[]> {
    try {
      const result = await apiRequest<HotelReportCategoryResponse[]>(
        `${API.HotelReportCategoriesByStageId}?stageId=${stageId}`,
        {
          method: 'GET',
        },
      ).then(data => data.data);

      if (!result) {
        router.push(PAGES.HotelReports);
      }

      return result;
    } catch (e: any) {
      errorNotify(e.message);
      return [];
    }
  }

  async function fetchHotelReportCriteriaByCategoryId(
    categoryId: number,
  ): Promise<HotelReportCriterion[]> {
    try {
      const result = await apiRequest<HotelReportCriterion[]>(
        `${API.HotelReportCriteriaByCategoryId}?categoryId=${categoryId}`,
        {
          method: 'GET',
        },
      ).then(data => data.data);

      if (!result) {
        router.push(PAGES.HotelReports);
      }

      return result;
    } catch (e: any) {
      errorNotify(e.message);
      return [];
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

      goToHotelReportStagesPage(report.id);
    } catch (e: any) {
      errorNotify(e.message);
    }
  }

  function goToHotelReportPage(reportId: number) {
    router.push({ path: PAGES.HotelReport, query: { reportId } });
  }

  function goToHotelReportStagesPage(reportId: number) {
    router.push({ path: PAGES.HotelReportStages, query: { reportId } });
  }

  function goToHotelReportCategoriesPage(reportId: number, stageId: number) {
    router.push({ path: PAGES.HotelReportCategories, query: { reportId, stageId } });
  }

  function goToHotelReportCriteriaPage(reportId: number, stageId: number, categoryId: number) {
    router.push({ path: PAGES.HotelReportCriteria, query: { reportId, stageId, categoryId } });
  }

  function getButtonLabel(progress: HotelReportStageProgress | HotelReportCategoryProgress) {
    if (progress.current === progress.max) {
      return t('view');
    }

    if (progress.current === 0) {
      return t('start');
    }

    return t('continue');
  }

  return {
    fetchHotelReportById,
    fetchHotelReports,
    createHotelReport,
    goToHotelReportPage,
    goToHotelReportStagesPage,
    goToHotelReportCategoriesPage,
    goToHotelReportCriteriaPage,
    getButtonLabel,
    fetchHotelReportStagesByReportId,
    fetchHotelReportCategoriesByStageId,
    fetchHotelReportCriteriaByCategoryId,
  };
}
