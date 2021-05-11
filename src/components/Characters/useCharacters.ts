import { onMounted, ref, Ref, computed } from "vue";
import { api } from "@/services/api";
import { Character } from "@/types/Character";
import { useStore } from "@/store";

// eslint-disable-next-line
export function useCharacters() {
  const store = useStore();
  const characters: Ref<Character[]> = ref([]);
  const total: Ref<number> = ref(0);
  let page = 1;

  onMounted(async () => {
    const result = await api.getCharacters(page, false, store.state.wookie);
    characters.value = result.characters;
    total.value = result.total;
  });

  const canLoadMore = computed(() => {
    return total.value > characters.value.length;
  });

  const loadMore = async () => {
    page = page + 1;
    const result = await api.getCharacters(page, false, store.state.wookie);
    characters.value = characters.value.concat(result.characters);
    total.value = result.total;
  };

  return { characters, loadMore, canLoadMore };
}
