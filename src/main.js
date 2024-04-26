import { createApp } from "vue";
import "primevue/resources/themes/aura-light-green/theme.css";
import "vue-toast-notification/dist/theme-bootstrap.css";
import "./style.css";
import App from "./App.vue";
import router from "@/plugins/router";
import PrimeVue from "primevue/config";
import { isAxiosError } from "axios";
import { createPinia } from "pinia";

import Column from "primevue/column";
import Divider from "primevue/divider";
import ColumnGroup from "primevue/columngroup";
import ConfirmDialog from "primevue/confirmdialog";
import ToastPlugin from "vue-toast-notification";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import DialogService from "primevue/dialogservice";
import Dropdown from "primevue/dropdown";
import Paginator from "primevue/paginator";
import Row from "primevue/row";
import FileUpload from "primevue/fileupload";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(DialogService);
app.use(router);
app.use(ToastPlugin);
app.use(createPinia());
app.component("Column", Column);
app.component("FileUpload", FileUpload);
app.component("Divider", Divider);
app.component("ColumnGroup", ColumnGroup);
app.component("ConfirmDialog", ConfirmDialog);
app.component("DataTable", DataTable);
app.component("DataView", DataView);
app.component("Dropdown", Dropdown);
app.component("Button", Button);
app.component("Image", Image);
app.component("Paginator", Paginator);
app.component("Row", Row);
app.component("Toast", Toast);
import { useToast } from "vue-toast-notification";

app.config.errorHandler = async (err) => {
  const $newToast = useToast();
  if (isAxiosError(err)) {
    switch (err.response?.status) {
      case 419:
      case 401:
        // unauthorized
        // await router.push("/login")
        $newToast.error(err.response.data.error, {
          position: "bottom",
        });
        break;
      case 403:
        // this action is not allowed
        break;
      case 405:
      case 404:
        // redirect user to /404 page
        break;
      case 500:
        $newToast.error(err.response.data.error, {
          position: "bottom",
        });
        break;
      default:
        return "Something went wrong...";
    }
  }
};

app.mount("#app");
