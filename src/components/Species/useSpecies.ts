import { onMounted, ref, Ref, computed } from "vue";
import { api } from "@/services/api";
import { Specie } from "@/types/Specie";
import { useStore } from "@/store";

// eslint-disable-next-line
export function useSpecies(search = "") {
  const store = useStore();
  const species: Ref<Specie[]> = ref([]);
  const total: Ref<number> = ref(0);
  let page = 1;

  onMounted(async () => {
    const result = await api.getSpecies(
      page,
      false,
      store.state.wookie,
      search
    );
    species.value = result.species;
    total.value = result.total;
  });

  const canLoadMore = computed(() => {
    return total.value > species.value.length;
  });

  const loadMore = async () => {
    page = page + 1;
    const result = await api.getSpecies(
      page,
      false,
      store.state.wookie,
      search
    );
    species.value = species.value.concat(result.species);
    total.value = result.total;
  };

  return { species, loadMore, canLoadMore };
}
