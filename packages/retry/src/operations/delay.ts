export const delay = (props: { delay: number; currentAttempt: number; maxAttempts: number }) => {
  return new Promise((resolve) => {
    if (props.currentAttempt < props.maxAttempts) {
      setTimeout(() => resolve(props.delay), props.delay);
      return;
    }

    resolve(props.delay);
  });
};
