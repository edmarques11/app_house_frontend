export default defineNuxtRouteMiddleware((to) => {
  const authCookie = useCookie("authorization");

  const publicRoutes = ["auth"];
  if (to.name === "auth" && authCookie.value) {
    return navigateTo("/");
  } else if (
    !authCookie.value &&
    !publicRoutes.includes(to.name?.toString() || "")
  ) {
    return navigateTo("/auth");
  }
});
