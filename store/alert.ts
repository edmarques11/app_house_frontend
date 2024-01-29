import { defineStore } from "pinia";

type typeAlert = "error" | "success";

export const alertStore = defineStore("alert", {
  state: () => ({
    props: {
      modelValue: false,
      text: "",
      color: "red",
      closable: true,
      elevation: 4,
    },
  }),
  actions: {
    show(message: string, type: typeAlert = "success") {
      const mapColors = {
        success: "green",
        error: "red",
      };

      Object.assign(this.props, {
        modelValue: true,
        text: message,
        color: mapColors[type],
      });

      setTimeout(() => {
        this.props.modelValue = false;
      }, 5000);
    },
  },
});
