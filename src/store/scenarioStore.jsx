import { create } from "zustand";

const useScenarioStore = create((set) => ({
  scenarios: [],
  loading: false,
  error: null,

  fetchScenarios: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("https://68dbdac9445fdb39dc26d84f.mockapi.io/api/v1/scenarios"); 
      const data = await res.json();
      set({ scenarios: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useScenarioStore;
