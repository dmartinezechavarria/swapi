import { onMounted, ref, Ref, computed } from "vue";
import { api } from "@/services/api";
import { Film } from "@/types/Film";

export function useFilms() {
  const films: Ref<Film[]> = ref([]);
  const total: Ref<number> = ref(0);
  let page = 1;

  onMounted(async () => {
    const result = await api.getFilms();
    films.value = result.films;
    total.value = result.total;
  });

  const canLoadMore = computed(() => {
    return total.value > films.value.length;
  });

  const loadMore = async () => {
    page = page + 1;
    const result = await api.getFilms(page);
    films.value = films.value.concat(result.films);
    total.value = result.total;
  };

  return { films, loadMore, canLoadMore };
}
