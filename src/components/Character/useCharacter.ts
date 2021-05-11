import { onMounted, ref, Ref } from "vue";
import { api } from "@/services/api";
import { Character } from "@/types/Character";
import { useStore } from "@/store";

export function useCharacter(id: number): Ref<null | Character> {
  const store = useStore();
  const character: Ref<null | Character> = ref(null);

  onMounted(async () => {
    character.value = await api.getCharacter(id, true, store.state.wookie);
  });

  return character;
}
