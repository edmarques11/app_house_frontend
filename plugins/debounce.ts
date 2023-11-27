function debounce<T extends Function>(cb: T, wait = 20) {
  let h: NodeJS.Timeout;
  const callable = (...args: any) => {
    clearTimeout(h);
    // eslint-disable-next-line n/no-callback-literal
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      debounce,
    },
  };
});
