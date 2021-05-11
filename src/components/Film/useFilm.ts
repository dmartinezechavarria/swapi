import { onMounted, ref, Ref } from "vue";
import { api } from "@/services/api";
import { Film } from "@/types/Film";

export function useFilm(id: number): Ref<null | Film> {
  const film: Ref<null | Film> = ref(null);

  onMounted(async () => {
    film.value = await api.getFilm(id);
  });

  return film;
}
