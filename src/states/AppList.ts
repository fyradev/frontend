import axios from 'axios';
import { create } from 'zustand';
import getBaseUrl from '../common/getBaseUrl';

export interface AppListState {
    apps: Types.App[];
    addApp: (app: Types.App) => void;
    removeApp: (app: Types.App) => void;
    updateApp: (app: Types.App) => void;
    requestApps: () => Promise<void>;
}

export const useAppList = create<AppListState> ((set) => ({
    apps: [],
    addApp: (app) => set((state) => ({ apps: [...state.apps, app] })),
    removeApp: (app) => set((state) => ({ apps: state.apps.filter((a) => a !== app) })),
    updateApp: (app) => set((state) => ({ apps: state.apps.map((a) => (a === app ? app : a)) })),
    requestApps: async () => {
        const response = await axios.get(`${getBaseUrl()}/api/apps/get/`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        set({ apps: response.data.apps });
    }
}));