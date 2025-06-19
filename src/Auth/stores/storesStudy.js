import { create } from "zustand";

export const useRefreshStore = create((set) => ({
value: true,
setValue: (callback) => set(state => ({value: callback(state)})),}));

export const useGlobalStateStore = create((set) => ({
    name: "이수원",
    setName: (newName) => set(state => ({name: newName})),
    setName2: () => set(state => {name: state.name + "님"}),
}));

// export const useRefreshStore = create((set) => ({
//     isRefresh: true,
//     refresh: () => set(state => ({isRefresh: true})),
//     reset: () => set(state => ({isRefresh: false})),
// }));