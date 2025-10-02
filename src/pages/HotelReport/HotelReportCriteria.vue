<template>
  <div class="hotel-report-criteria">
    <div class="hotel-report-criteria__header">
      <Button
        class="hotel-report-criteria__back"
        v-tooltip.bottom="$t('backToCategories')"
        icon="pi pi-chevron-left"
        outlined
        rounded
        @click="goToHotelReportCategoriesPage(reportId, stageId)"
      />
      <h1>{{ $t('hotelReportCriteria') }}</h1>
    </div>

    <div class="hotel-report-criteria__form">
      <Tabs :value="currentTabValue">
        <TabList>
          <Tab v-for="(item, index) in criteria" :key="item.id" :value="index">
            <div
              :class="[
                'hotel-report-criteria__tab',
                {
                  'hotel-report-criteria__tab--saved': item.isSaved,
                },
              ]"
            >
              <i v-if="item.isSaved" class="pi pi-check-circle"></i>
              <span>{{ item.name[localeKey] }}</span>
            </div>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel v-for="(item, index) in criteria" :key="item.id" :value="index" class="form">
            <div class="form__line">
              <h2 class="form__title">{{ item.name[localeKey] }}</h2>

              <p class="form__description">{{ item.description[localeKey] }}</p>
            </div>

            <div class="form__line">
              <b class="form__subtitle">{{ $t('yourScore') }}</b>

              <Rating v-model="item.score" />
            </div>

            <div class="form__line">
              <b class="form__subtitle">{{ $t('comment') }}</b>

              <Textarea
                v-model="item.comment"
                fluid
                name="travel"
                autoResize
                rows="5"
                :placeholder="$t('shareYourImpressions')"
              />
            </div>

            <div class="form__line">
              <b class="form__subtitle">{{ $t('photoVideoOrAudio') }}</b>

              <FileUpload
                v-model="item.media"
                name="demo[]"
                url="/api/upload"
                @upload="() => {}"
                :multiple="true"
                accept="image/*"
                :maxFileSize="1000000"
                :chooseLabel="$t('chooseFile')"
                :uploadLabel="$t('upload')"
                :cancelLabel="$t('cancel')"
              >
                <template #empty>
                  <p class="form__description">{{ $t('dragAndDropFilesToHereToUpload') }}</p>
                </template>
              </FileUpload>
            </div>

            <div class="form__line form__actions">
              <Button :label="$t('skip')" outlined @click="goToNextTab" />

              <Button :label="$t('save')" :disabled="item.isSaved" @click="saveCriterion(item)" />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '../../composables/useUser.ts';
import { useHotelReports } from '../../localization/modules/useHotelReports.ts';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import type { HotelReportCriterionForm } from '../../types.ts';
import { API, PAGES } from '../../constants.ts';
import { useLocale } from '../../composables/useLocale.ts';
import { apiRequest } from '../../api/request.ts';
import { useNotifications } from '../../composables/useNotifications.ts';

const props = defineProps<{
  reportId: number;
  stageId: number;
  categoryId: number;
}>();

const { isAuth, user } = useUser();
const { fetchHotelReportCriteriaByCategoryId, goToHotelReportCategoriesPage } = useHotelReports();
const router = useRouter();
const { localeKey } = useLocale();
const { errorNotify } = useNotifications();

const criteria = ref<HotelReportCriterionForm[]>([]);
const currentTabValue = ref(0);

function goToNextTab() {
  currentTabValue.value = currentTabValue.value + 1;
}

async function saveCriterion(item: HotelReportCriterionForm) {
  try {
    // в идеале тут бы еще форму валидировать, но не успеваю
    const response = await apiRequest(API.HotelReportCriteriaSave, {
      method: 'POST',
      body: {
        userId: user.value?.id,
        reportId: props.reportId,
        criterionId: item.id,
        comment: item.comment,
        score: item.score,
        media: item.media,
      },
    });

    if (response.success) {
      item.isSaved = true;
      goToNextTab();
    }
  } catch (e: any) {
    errorNotify(e.message);
    return null;
  }
}

onMounted(async () => {
  if (isAuth.value) {
    const response = await fetchHotelReportCriteriaByCategoryId(props.categoryId);

    criteria.value = response.map(item => ({
      ...item,
      score: 0,
      comment: '',
      media: [],
      isSaved: false,
    }));
  } else {
    router.push(PAGES.Login);
  }
});
</script>

<style>
.hotel-report-criteria {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacer-e);
  padding-top: var(--spacer-e);
}

.hotel-report-criteria__header {
  display: flex;
  position: relative;
}

.hotel-report-criteria__back {
  position: absolute !important;
  left: -4rem;
  top: 0;
}

.hotel-report-criteria__form {
  max-width: 800px;
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--spacer-e);
}

.form__title,
.form__description {
  text-align: start;
}

.form__title {
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  margin-bottom: var(--spacer-c);
}

.form__description {
  font-size: 0.9rem;
  color: var(--p-button-text-secondary-color);
}

.form__line {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-c);
  width: 100%;
}

.form__actions {
  flex-direction: row;
  justify-content: space-between;
}

.hotel-report-criteria__tab {
  display: flex;
  align-items: center;
  gap: var(--spacer-c);
}

.hotel-report-criteria__tab--saved {
  color: var(--p-emerald-500);
}
</style>
