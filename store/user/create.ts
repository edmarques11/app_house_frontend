import { defineStore } from "pinia";
import { alertStore } from "../alert";

type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  profile_image_id?: string;
};

type ErrorsType = {
  name: null | string;
  email: null | string;
  password: null | string;
  profile_image_id: null | string;
  [key: string]: null | string;
};

export const createUserStore = defineStore("createUser", {
  state: () => ({
    data: {
      name: "",
      email: "",
      password: "",
      profile_image_id: "",
    } as CreateUserDTO,
    errors: {
      name: null,
      email: null,
      password: null,
      profile_image_id: null,
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
    async create() {
      const alert = alertStore();

      try {
        const nuxtApp = useNuxtApp();

        if (!this.data.profile_image_id) delete this.data.profile_image_id;

        await nuxtApp.$axios.post("/user", this.data);

        this.setErrors([]);
        alert.show("Cadastro realizado com sucesso!", "success");
      } catch (err: any) {
        if (err?.data?.length) {
          this.setErrors(err.data);
        }
        alert.show(err.message, "error");
      }
    },
  },
});
