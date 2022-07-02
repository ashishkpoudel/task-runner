export const waitFor = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(duration), duration);
  });
};
