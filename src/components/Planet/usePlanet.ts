import { onMounted, ref, Ref } from "vue";
import { api } from "@/services/api";
import { Planet } from "@/types/Planet";
import { useStore } from "@/store";

export function usePlanet(id: number): Ref<null | Planet> {
  const store = useStore();
  const planet: Ref<null | Planet> = ref(null);

  onMounted(async () => {
    planet.value = await api.getPlanet(id, true, store.state.wookie);
  });

  return planet;
}
