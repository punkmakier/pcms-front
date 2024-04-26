<template>
  <div class="parent-prof">
    <div style="margin-bottom: 60px">
      <div style="margin-top: 10px; display: flex; gap: 10px">
        <div style="flex-grow: 1">
          <label for="demo-name">Name </label>
          <input
            type="text"
            id="demo-name"
            class="field"
            :value="uid.fullname"
            style="color: #fff"
            readonly="true" />
          <input type="hidden" :value="uid.id" id="uid" />
        </div>
        <div style="flex-grow: 1">
          <label for="demo-name">Address</label>
          <input
            type="text"
            id="demo-name"
            class="field"
            :value="uid.address"
            style="color: #fff"
            readonly="true" />
        </div>
        <div style="flex-grow: 1">
          <label for="demo-name">Taxpayer Name</label>
          <input
            type="text"
            id="demo-name"
            class="field"
            :value="uid.tax_fullname"
            style="color: #fff"
            readonly="true" />
        </div>
      </div>
      <button class="btnPayment" @click="addPaymentModal">Add Payment</button>
    </div>
    <DataTable
      :value="paymentsList"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem">
      <Column field="date_paid" header="Date Paid"></Column>
      <Column field="kind" header="Kind"></Column>
      <Column field="permit_no" header="Permit No."></Column>
      <Column field="or_no" header="O.R No."></Column>
      <Column field="tax_amount" header="Tax Amount">
        <template #body="slotProps">
          <span
            >₱ {{ parseInt(slotProps.data.tax_amount).toLocaleString() }}</span
          >
        </template>
      </Column>
      <Column field="total" header="Total">
        <template #body="slotProps">
          <span>₱ {{ parseInt(slotProps.data.total).toLocaleString() }}</span>
        </template>
      </Column>
      <Column header="Actions" style="width: 20%">
        <template #body="slotProps">
          <div style="display: flex; gap: 10px">
            <button
              class="btn update"
              @click="updatePayment(slotProps.data.id)">
              Update
            </button>
            <button
              class="btn delete"
              @click="deletePayment(slotProps.data.id)">
              Delete
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
    <div style="margin-top: 50px"></div>
    <DataTable :value="[dataList]" tableStyle="min-width: 50rem">
      <Column field="tax_due_date_no" header="Tax Due" style="width: 50%">
        <template #body="slotProps">
          <span v-if="dataList"
            >{{
              [dataList].length > 0 ? slotProps.data.tax_due_date_no : ""
            }}
            years <small>({{ slotProps.data.tax_due_date }})</small></span
          >
          <span v-else> 6 years</span>
        </template>
      </Column>
      <Column field="fullname" header="Tax Next Payment">
        <template #body="slotProps">
          <span v-if="dataList"
            >{{
              [dataList].length > 0
                ? parseInt(slotProps.data.tax_due_date_no) + 1
                : ""
            }}
            years</span
          >
          <span v-else> 7 years</span>
        </template>
      </Column>
    </DataTable>
    <div style="text-align: end">
      <button class="btnPayment" @click="$emit('close')">Close</button>
    </div>
  </div>

  <div class="payment-form" v-if="addPayment">
    <div class="payment-child">
      <div class="payment-header">
        <h5 style="color: #000">{{ type }} Payment</h5>
      </div>
      <div class="payment-body">
        <div>
          <label for="demo-name" class="title">Date Paid</label>
          <input
            type="date"
            v-model="payments.datePaid"
            id="demo-name"
            class="field" />
        </div>
        <div>
          <label for="demo-name" class="title">Kind</label>
          <input
            type="text"
            id="demo-name"
            class="field"
            v-model="payments.kind" />
        </div>
        <div>
          <label for="demo-name" class="title">Permit No.</label>
          <input
            type="text"
            id="demo-name"
            class="field"
            v-model="payments.permitNo" />
        </div>
        <div>
          <label for="demo-name" class="title">O.R No.</label>
          <input
            type="text"
            id="demo-name"
            class="field"
            v-model="payments.or_no" />
        </div>
        <div>
          <label for="demo-name" class="title">Tax Amount</label>
          <input
            type="text"
            id="demo-name"
            class="field"
            v-model="payments.taxAmount" />
        </div>
        <div>
          <label for="demo-name" class="title">Total</label>
          <input
            type="text"
            id="demo-name"
            class="field"
            v-model="payments.total" />
        </div>
        <br />
        <div>
          <label for="demo-name" class="title"
            >Tax Due Date
            <small>(Ex: 7 = for 7 years payment tax)</small></label
          >
          <input
            type="text"
            id="demo-name"
            class="field"
            v-model="payments.tax_due_date_no" />
        </div>
      </div>
      <div class="payment-footer">
        <button
          class="btn"
          style="margin-right: 10px"
          @click="addPayment = false">
          Close
        </button>
        <button class="btn success" @click="submitPayment" v-if="type == 'Add'">
          Submit
        </button>
        <button class="btn update" @click="confirmUpdatePayment" v-else>
          Update
        </button>
      </div>
    </div>
  </div>

  <confirm-component
    v-if="showConfirmation"
    @closeConfirm="showConfirmation = false">
    <template #bodyConfirm>
      <h3 style="color: #000">Are you sure you want to delete this?</h3>
    </template>
    <template #footer>
      <button class="success" @click="confirmDeletePayment">Confirm</button>
    </template>
  </confirm-component>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "@/plugins/API";
import { useToast } from "vue-toast-notification";
import ConfirmComponent from "@/components/ConfirmComponent.vue";
const type = ref("Add");
defineProps(["uid"]);
const addPayment = ref(false);
const idToDelete = ref();
const showConfirmation = ref(false);

const dataList = ref();
const toast = useToast();
const payments = reactive({
  uid: $("#uid").val(),
});
const paymentsList = ref();
async function getPayments() {
  const id = $("#uid").val();
  console.log(id);
  const res = await axios.get(`/getPayments/${id}`);
  if (res.status === 200) {
    paymentsList.value = res.data;
    console.log(paymentsList.value);
    const sort = paymentsList.value.sort((a, b) => b.id - a.id);
    dataList.value = sort[0];
    console.log(dataList.value);
  }
}

onMounted(() => {
  getPayments();
});

const addPaymentModal = () => {
  type.value = "Add";
  addPayment.value = true;
};

const submitPayment = async () => {
  payments.uid = $("#uid").val();
  const res = await axios.post("/addPayment", payments);
  if (res.status === 201) {
    window.location.reload();
  } else {
    toast.success("Deleted successfully.", {
      position: "bottom",
    });
  }
};

const deletePayment = (id) => {
  showConfirmation.value = true;
  idToDelete.value = id;
};

const confirmDeletePayment = async () => {
  const res = await axios.delete(`/deletePayment/${idToDelete.value}`);
  if (res.status === 200) {
    toast.success("Deleted successfully.", {
      position: "bottom",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
};

const toUpdateID = ref();
const updatePayment = (id) => {
  toUpdateID.value = id;
  const res = paymentsList.value.filter((item) => item.id === id);
  console.log(dataList.value);
  payments.datePaid = res[0].date_paid;
  payments.kind = res[0].kind;
  payments.permitNo = res[0].permit_no;
  payments.or_no = res[0].or_no;
  payments.taxAmount = res[0].tax_amount;
  payments.total = res[0].total;
  payments.tax_due_date_no = res[0].tax_due_date_no;
  type.value = "Update";
  addPayment.value = true;
};

const confirmUpdatePayment = async () => {
  const res = await axios.put(`/updatePayments/${toUpdateID.value}`, payments);
  if (res.status === 200 || res.status === 201) {
    toast.success("Updated successfully.", {
      position: "bottom",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
};
</script>

<style scoped>
.payment-footer {
  margin-top: 50px;
  text-align: end;
}
.update {
  background-color: #a8a508 !important;
}
.delete {
  background-color: #a81b08 !important;
}
.success {
  background-color: #59b259 !important;
}
.btn {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
.parent-prof {
  width: 95%;
  height: 95vh;
  margin: 0 auto;
  background-color: #31225b;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  z-index: 9999;
  padding: 40px 50px;
  overflow: auto;
}
.payment-header,
.payment-body {
  padding: 10px;
}
.payment-form {
  width: 100%;
  height: 150vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  overflow: auto;
}
.payment-child {
  width: 850px;
  max-height: 950px;
  margin-top: 30px;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
}
input[type="text"] {
  color: #000;
}
.btnPayment {
  color: #fff !important;
  background-color: #5267b4;
  margin-top: 20px;
}
.btnPayment:hover {
  background-color: #41569d;
}
</style>
