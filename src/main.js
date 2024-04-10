import { createApp } from "vue";
// import "./style.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import App from "./App.vue";
import router from "@/plugins/router";
import PrimeVue from "primevue/config";

import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import ConfirmDialog from "primevue/confirmdialog";

import DataTable from "primevue/datatable";
import Button from "primevue/button";
import DialogService from "primevue/dialogservice";
import Dropdown from "primevue/dropdown";
import Paginator from "primevue/paginator";
import Row from "primevue/row";

import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(DialogService);
app.use(router);

app.component("Column", Column);
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
app.mount("#app");
