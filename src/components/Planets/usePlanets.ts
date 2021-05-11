import { onMounted, ref, Ref, computed } from "vue";
import { api } from "@/services/api";
import { Planet } from "@/types/Planet";
import { useStore } from "@/store";

// eslint-disable-next-line
export function usePlanets() {
  const store = useStore();
  const planets: Ref<Planet[]> = ref([]);
  const total: Ref<number> = ref(0);
  let page = 1;

  onMounted(async () => {
    const result = await api.getPlanets(page, false, store.state.wookie);
    planets.value = result.planets;
    total.value = result.total;
  });

  const canLoadMore = computed(() => {
    return total.value > planets.value.length;
  });

  const loadMore = async () => {
    page = page + 1;
    const result = await api.getPlanets(page, false, store.state.wookie);
    planets.value = planets.value.concat(result.planets);
    total.value = result.total;
  };

  return { planets, loadMore, canLoadMore };
}
