import { defineStore } from "pinia";

type typeAlert = "error" | "success";

type IProps = {
  modelValue: boolean;
  text: string;
  color: string;
  closable: boolean;
  elevation: number;
};

function copyData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export const alertStore = defineStore("alert", () => {
  const defaultProps: IProps = {
    modelValue: false,
    text: "",
    color: "red",
    closable: true,
    elevation: 4,
  };

  const props = ref<IProps>(copyData<IProps>(defaultProps));

  function show(message: string, type: typeAlert = "success"): void {
    const mapColors = {
      success: "green",
      error: "red",
    };

    Object.assign(props.value, {
      modelValue: true,
      text: message,
      color: mapColors[type],
    });

    setTimeout(() => {
      props.value.modelValue = false;
    }, 5000);
  }

  function $reset(): void {
    props.value = copyData<IProps>(defaultProps);
  }

  return {
    props,
    show,
    $reset,
  };
});
