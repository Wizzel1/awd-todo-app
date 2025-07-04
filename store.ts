import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Task from "./types/task";

interface TaskState {
  funMode: boolean;
  setupMode: boolean;
  activeList: string | null;
  searchTerm: string;
  countingTasks: Task[];
  countCompletedTasks: number;
  countActiveTasks: number;
}

interface TaskActions {
  finishSetup: () => void;
  setActiveList: (newActiveList: string | null) => void;
  setSearchTerm: (newSearchTerm: string) => void;
  toggleFunMode: () => void;
  setCountingTasks: (newCountingTasks: Task[]) => void;
  setCountCompletedTasks: () => void;
  setActiveTasks: () => void;
}

type TaskStore = TaskState & TaskActions;

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      funMode: false,
      setupMode: true,
      finishSetup: () => set({ setupMode: false }),
      activeList: null,
      setActiveList: (newActiveList: string | null) => set({ activeList: newActiveList }),
      searchTerm: "",
      setSearchTerm: (newSearchTerm: string) => set({ searchTerm: newSearchTerm }),
      toggleFunMode: () =>
        set((state: TaskState) => ({
          funMode: !state.funMode,
        })),
      countingTasks: [],
      setCountingTasks: (newCountingTasks: Task[]) => set({ countingTasks: newCountingTasks }),
      countCompletedTasks: 0,
      countActiveTasks: 0,

      setCountCompletedTasks: () => {
        const state = get();
        const count = state.countingTasks.reduce((count: number, task: Task) => (task.completed ? count + 1 : count), 0);
        set({ countCompletedTasks: count });
      },

      setActiveTasks: () => {
        const state = get();
        const countCompleted = state.countingTasks.reduce((count: number, task: Task) => (task.completed ? count + 1 : count), 0);
        const active = state.countingTasks.length - countCompleted;
        set({ countActiveTasks: active });
      },
    }),

    {
      name: "task-tango-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
