export default defineNuxtPlugin(() => {
  const authCookie = useCookie("authorization");

  const logout = () => {
    authCookie.value = "";
    navigateTo("/auth");
  };

  return {
    provide: { logout },
  };
});
