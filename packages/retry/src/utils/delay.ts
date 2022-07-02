export const delay = (props: { delay: number; currentAttempt: number; maxAttempts: number }) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(props.delay), props.delay);
  });
};
