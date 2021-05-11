import { onMounted, ref, Ref } from "vue";
import { api } from "@/services/api";
import { Specie } from "@/types/Specie";
import { useStore } from "@/store";

export function useSpecie(id: number): Ref<null | Specie> {
  const store = useStore();
  const specie: Ref<null | Specie> = ref(null);

  onMounted(async () => {
    specie.value = await api.getSpecie(id, true, store.state.wookie);
  });

  return specie;
}
