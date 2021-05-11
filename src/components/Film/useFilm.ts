import { onMounted, ref, Ref } from "vue";
import { api } from "@/services/api";
import { Film } from "@/types/Film";
import { useStore } from "@/store";

export function useFilm(id: number): Ref<null | Film> {
  const store = useStore();
  const film: Ref<null | Film> = ref(null);

  onMounted(async () => {
    film.value = await api.getFilm(id, true, store.state.wookie);
  });

  return film;
}
