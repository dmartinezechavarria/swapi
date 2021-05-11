import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export const WOOKIE_CHANGE = "WOOKIE_CHANGE";

export interface State {
  wookie: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

const WOOKIE = "WOOKIE";

export const store = createStore<State>({
  state: {
    wookie: sessionStorage.getItem(WOOKIE) === "true" ? true : false,
  },
  mutations: {
    [WOOKIE_CHANGE](state, payload) {
      state.wookie = payload;
      sessionStorage.setItem(WOOKIE, payload ? "true" : "false");
    },
  },
  actions: {},
  modules: {},
});

// define your own `useStore` composition function
export function useStore(): Store<State> {
  return baseUseStore(key);
}
