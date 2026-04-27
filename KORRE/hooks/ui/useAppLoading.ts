import { create } from 'zustand';

interface AppLoadingState {
  visible: boolean;
  message: string;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

export const useAppLoading = create<AppLoadingState>((set) => ({
  visible: false,
  message: 'Carregando...',
  showLoading: (message = 'Carregando...') =>
    set({ visible: true, message }),
  hideLoading: () => set({ visible: false }),
}));

export const showAppLoading = (message?: string) => {
  useAppLoading.getState().showLoading(message);
};

export const waitForAppLoadingFrame = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      setTimeout(resolve, 80);
    });
  });

export const showAppLoadingAsync = async (message?: string) => {
  showAppLoading(message);
  await waitForAppLoadingFrame();
};

export const hideAppLoading = () => {
  useAppLoading.getState().hideLoading();
};
