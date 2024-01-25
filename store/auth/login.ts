import { defineStore } from "pinia";
import { alertStore } from "../alert";

type ErrorsType = {
  username: null | string;
  password: null | string;
  [key: string]: null | string;
};

export const loginStore = defineStore("login", {
  state: () => ({
    username: "",
    password: "",
    errors: {
      username: null,
      password: null,
    } as ErrorsType,
  }),
  actions: {
    setErrors(errors: string[]) {
      const keysErrors = Object.keys(this.errors);

      keysErrors.forEach((key) => {
        this.errors[key] =
          errors.find((e) => e.includes(key))?.replace(`${key}: `, "") || null;
      });
    },
    async doLogin() {
      const alert = alertStore();
      const router = useRouter();
      const cookie = useCookie("authorization", { secure: true });

      try {
        const nuxtApp = useNuxtApp();
        const { username, password } = this;

        const {
          data: { token },
        } = await nuxtApp.$axios.post("/login", {
          username,
          password,
        });

        cookie.value = "Bearer " + token;

        this.setErrors([]);
        alert.show("Login realizado com sucesso", "success");
        router.push("/");
      } catch (err: any) {
        if (err?.data?.length) {
          this.setErrors(err.data);
        }
        alert.show(err.message, "error");
      }
    },
  },
});
