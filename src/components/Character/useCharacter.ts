import { onMounted, ref, Ref } from "vue";
import { api } from "@/services/api";
import { Character } from "@/types/Character";

export function useCharacter(id: number): Ref<null | Character> {
  const character: Ref<null | Character> = ref(null);

  onMounted(async () => {
    character.value = await api.getCharacter(id);
  });

  return character;
}
