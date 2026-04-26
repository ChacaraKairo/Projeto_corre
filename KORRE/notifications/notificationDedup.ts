export const shouldCreateNotificationForDedup = (
  dedupKey: string | undefined,
  exists: boolean,
) => !dedupKey || !exists;
