<template>
  <div class="dashboard-parent">
    <div class="img-parent">
      <swiper
        class="carousel-parent"
        :modules="[Autoplay]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{
          delay: 3000,
        }">
        <swiper-slide v-for="(value, index) in images" :key="index">
          <img :src="`/src/assets/images/${value}`" class="image" />
        </swiper-slide>
      </swiper>
    </div>
    <br />
    <h3>good day, {{ userAccount.name }}!</h3>
    <small>Logged in as: {{ formatRole(parseInt(userAccount.role)) }}</small>
    <div class="admin-header">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
        <div class="list-items">
          <a
            href="javascript:void(0)"
            @click="current_tab = 'records'"
            class="drp"
            >Profiling</a
          >
          <div class="drp-items">
            <a href="javascript:void(0)" class="" @click="filterDesc('all')"
              >All</a
            >
            <a href="javascript:void(0)" class="" @click="filterDesc('oldpob')"
              >OLD POBLACION CEMETER</a
            >
            <a href="javascript:void(0)" class="" @click="filterDesc('eastval')"
              >EAST VALENCIA CEMETERY</a
            >
            <a href="javascript:void(0)" class="" @click="filterDesc('banban')"
              >BANBAN CEMETERY</a
            >
          </div>
          <a
            href="javascript:void(0)"
            @click="current_tab = 'notification'"
            v-if="userAccount.role != 0"
            >Notifications</a
          >
          <a
            href="javascript:void(0)"
            @click="current_tab = 'accounts'"
            v-if="userAccount.role != 0"
            >Accounts</a
          >
        </div>

        <div>
          <a href="javascript:void(0)" @click="logout">Logout</a>
        </div>
      </div>
    </div>

    <div class="items" style="margin-top: 20px">
      <div v-if="current_tab == 'records'">
        <a
          href="javascript:void(0)"
          class="button primary fit small"
          style="width: 20%"
          @click="showModalDecease"
          v-if="userAccount.role != 0"
          >Add Deceased Person</a
        >
        <div style="margin-top: 50px">
          <h3>Deceased Person</h3>

          <DataTable
            :value="deceasedList"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem">
            <div
              style="
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
              ">
              <div></div>
              <input
                type="text"
                style="width: 30%"
                placeholder="Search fullname..."
                @input="handleSearch" />
            </div>

            <Column field="id" header="No"></Column>
            <Column header="Full Name">
              <template #body="slotProps">
                <span
                  @click="profilingData(slotProps.data.id)"
                  style="text-decoration: underline; cursor: pointer"
                  >{{ slotProps.data.fullname }}</span
                >
              </template>
            </Column>
            <Column field="born" header="Born"></Column>
            <Column field="died" header="Died"></Column>
            <Column field="location" header="Cemetery Location">
              <template #body="slotProps">
                {{ formatLocation(slotProps.data.cemetery_location) }}
              </template>
            </Column>
            <Column header="Action">
              <template #body="slotProps">
                <div style="display: flex; gap: 15px">
                  <button
                    class="editbtn"
                    @click="editDeceased(slotProps.data.id)">
                    Edit
                  </button>
                  <button
                    class="deletebtn"
                    @click="deleteDeceased(slotProps.data.id)"
                    v-if="userAccount.role != 0">
                    Delete
                  </button>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <div v-if="current_tab == 'notification'">
        <DataTable tableStyle="min-width: 50rem">
          <Column field="idno" header="Deceased ID"></Column>
          <Column field="fullname" header="Message"></Column>
        </DataTable>
      </div>

      <div v-if="current_tab == 'accounts'">
        <a
          href="javascript:void(0)"
          class="button primary fit small"
          style="width: 20%"
          @click="showModalUserFunc"
          >Add User</a
        >
        <div style="margin-top: 50px">
          <h3>User List</h3>

          <DataTable
            :value="userlist"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem">
            <Column field="idno" header="ID Number"></Column>
            <Column field="fullname" header="Full Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column header="User Type">
              <template #body="slotProps">
                {{ getUserType(parseInt(slotProps.data.role)) }}
              </template>
            </Column>
            <Column header="Action">
              <template #body="slotProps">
                <div style="display: flex; gap: 15px">
                  <button class="editbtn" @click="editUser(slotProps.data.id)">
                    Edit
                  </button>
                  <button
                    class="deletebtn"
                    @click="deleteUser(slotProps.data.id)">
                    Delete
                  </button>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
    <dialog-component
      :title="`${modalTitle} DECEASED`"
      v-if="addDeceased"
      @closeModal="closeModal">
      <template #bodyDialog>
        <div>
          <label for="demo-name" class="title">Complete Name</label>
          <input
            type="text"
            v-model="deceasedPerson.fullname"
            id="demo-name"
            class="field"
            :readonly="isEnabledFields" />
        </div>
        <div>
          <label for="demo-name" class="title">Address</label>
          <input
            type="text"
            v-model="deceasedPerson.address"
            id="demo-name"
            class="field"
            :readonly="isEnabledFields" />
        </div>

        <div style="margin-top: 10px; display: flex; gap: 10px">
          <div style="flex-grow: 1">
            <label for="demo-name" class="title">Born</label>
            <input
              type="date"
              v-model="deceasedPerson.born"
              id="demo-name"
              class="field"
              :readonly="isEnabledFields" />
          </div>
          <div style="flex-grow: 1">
            <label for="demo-name" class="title">Died</label>
            <input
              type="date"
              v-model="deceasedPerson.died"
              id="demo-name"
              class="field"
              :readonly="isEnabledFields" />
          </div>
          <div style="flex-grow: 1">
            <label for="demo-name" class="title">Date of Permit</label>
            <input
              type="date"
              v-model="deceasedPerson.date_of_permit"
              id="demo-name"
              class="field"
              :readonly="isEnabledFields" />
          </div>
        </div>
        <div style="margin-top: 10px">
          <label for="demo-name" class="title">Cemetery Location</label>
          <select
            v-model="deceasedPerson.cemetery_location"
            id="demo-category"
            class="field"
            :disabled="isEnabledFields">
            <option>-</option>
            <option value="1">OLD POBLACION</option>
            <option value="2">EAST VALENCIA</option>
            <option value="3">BANBAN</option>
          </select>
        </div>
        <div style="margin-top: 10px">
          <label for="lapida" class="title">Lapida Image</label>
          <div class="lap" style="display: flex">
            <input type="file" @change="fileUploadHandler" />
            <span id="fileName"></span>
          </div>
        </div>
        <div
          style="margin-top: 10px; display: flex; gap: 10px"
          v-if="userAccount.role == 0">
          <div style="flex-grow: 1">
            <label for="demo-name" class="title">Latitude</label>
            <input
              type="text"
              v-model="deceasedPerson.latitude"
              id="demo-name"
              class="field" />
          </div>
          <div style="flex-grow: 1">
            <label for="demo-name" class="title">Longitude</label>
            <input
              type="text"
              v-model="deceasedPerson.longitude"
              id="demo-name"
              class="field" />
          </div>
        </div>
        <br />
        <small>Nature of Application</small>
        <div style="margin-top: 10px; display: flex; gap: 10px">
          <div style="flex-grow: 1">
            <label for="demo-name" class="title">Layer of Niche</label>
            <input
              type="text"
              v-model="deceasedPerson.niche"
              id="demo-name"
              class="field"
              :readonly="isEnabledFields" />
          </div>
          <div style="flex-grow: 1">
            <label for="demo-name" class="title">Constructions</label>
            <input
              type="text"
              v-model="deceasedPerson.constructions"
              id="demo-name"
              class="field"
              :readonly="isEnabledFields" />
          </div>
          <div style="flex-grow: 1">
            <label for="demo-name" class="title">Excavation</label>
            <input
              type="text"
              v-model="deceasedPerson.excavation"
              id="demo-name"
              class="field"
              :readonly="isEnabledFields" />
          </div>
        </div>
        <br />
        <small>TAXPAYER INFORMATION</small>
        <div style="margin-top: 10px; display: flex; gap: 10px">
          <div style="flex-grow: 1">
            <label for="demo-name" class="title">Complete Name</label>
            <input
              type="text"
              v-model="deceasedPerson.tax_fullname"
              id="demo-name"
              class="field"
              :readonly="isEnabledFields" />
          </div>
          <div style="flex-grow: 1">
            <label for="demo-name" class="title">Contact No.</label>
            <input
              type="text"
              v-model="deceasedPerson.tax_contact"
              id="demo-name"
              class="field"
              :readonly="isEnabledFields" />
          </div>
        </div>
      </template>
      <template #footer>
        <button
          class="success"
          @click="submitDeceasedPerson"
          v-if="modalTitle == 'Add'">
          Submit
        </button>
        <button
          class="editbtn"
          @click="updateDeceasedPerson"
          v-if="modalTitle == 'Edit'">
          Update
        </button>
      </template>
    </dialog-component>

    <confirm-component @closeConfirm="closeConfirm" v-if="showConfirm">
      <template #bodyConfirm>
        <h3 style="color: #000">Are you sure you want to delete this?</h3>
      </template>
      <template #footer>
        <button class="success" @click="confirmDeleteUser">Confirm</button>
      </template>
    </confirm-component>
    <confirm-component
      @closeConfirm="closeConfirmDeceased"
      v-if="showConfirmDeceased">
      <template #bodyConfirm>
        <h3 style="color: #000">Are you sure you want to delete this?</h3>
      </template>
      <template #footer>
        <button class="success" @click="confirmDeleteDeceased">Confirm</button>
      </template>
    </confirm-component>

    <dialog-component
      :title="`${modalTitle} USER`"
      v-if="showModalUser"
      @closeModal="closeModalUser">
      <template #bodyDialog>
        <div>
          <label class="title">Complete Name</label>
          <input type="text" v-model="stateUser.fullname" class="field" />
        </div>
        <div style="margin-top: 10px">
          <label class="title">ID Number</label>
          <input
            type="text"
            v-model="stateUser.idno"
            class="field"
            :readonly="modalTitle == 'Edit'" />
        </div>
        <div style="margin-top: 10px">
          <label class="title">Email</label>
          <input type="email" v-model="stateUser.email" class="field" />
        </div>
        <div v-if="!modalTitle == 'Edit'" style="margin-top: 10px">
          <label class="title">Password</label>
          <input
            type="text"
            v-model="stateUser.password"
            class="field"
            readonly />
        </div>
        <div style="margin-top: 10px">
          <label class="title">User Type</label>

          <select v-model="stateUser.usertype" id="demo-category" class="field">
            <option>-</option>
            <option value="1">Super Admin</option>
            <option value="0">Enterprise</option>
          </select>
        </div>
      </template>
      <template #footer>
        <button class="success" @click="submitUser" v-if="modalTitle == 'Add'">
          Submit
        </button>
        <button class="editbtn" @click="updateUser" v-if="modalTitle == 'Edit'">
          Update
        </button>
      </template>
    </dialog-component>

    <Profiling
      @close="closeProfilingModal"
      v-if="proflingModal"
      :uid="selectedIDPayment" />
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import DialogComponent from "@/components/DialogComponent.vue";
import Profiling from "@/components/Profiling.vue";
import ConfirmComponent from "@/components/ConfirmComponent.vue";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRouter } from "vue-router";
import axios from "@/plugins/API";
import "swiper/css";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const selectedIDPayment = ref();
const current_tab = ref("records");
const addDeceased = ref(false);
const showModalUser = ref(false);
const showConfirm = ref(false);
const proflingModal = ref(false);

const showConfirmDeceased = ref(false);
const router = useRouter();
const userAccount = ref();
const confirmIdToDelete = ref();
const modalTitle = ref("Add");
const images = ref(["cem1.webp", "cem2.webp", "cem3.jpg"]);
const deceasedList = ref();
const allDeceased = ref();
const isEnabledFields = ref(false);

const userlist = ref();

async function getAllUsers() {
  const res = await axios.get("/allUsers");
  if (res.status === 200) {
    userlist.value = res.data;
  }
}

async function getAllDeceased() {
  const res = await axios.get("/getAllDeceased");
  if (res.status === 200) {
    deceasedList.value = res.data;
    allDeceased.value = res.data;
  }
}

const filterDesc = (val) => {
  current_tab.value = "records";
  if (val === "oldpob") {
    deceasedList.value = allDeceased.value.filter(
      (item) => item.cemetery_location == 1
    );
  }
  if (val === "eastval") {
    deceasedList.value = allDeceased.value.filter(
      (item) => item.cemetery_location == 2
    );
  }
  if (val === "banban") {
    deceasedList.value = allDeceased.value.filter(
      (item) => item.cemetery_location == 3
    );
  }
  if (val === "all") {
    deceasedList.value = allDeceased.value;
  }
};

const handleSearch = (e) => {
  console.log(e.target.value);
  deceasedList.value = allDeceased.value.filter((item) =>
    item.fullname.toLowerCase().includes(e.target.value.toLowerCase())
  );
};

const closeProfilingModal = () => {
  proflingModal.value = false;
};
const profilingData = (id) => {
  const res = allDeceased.value.filter((item) => item.id == id);
  console.log(res);
  selectedIDPayment.value = res[0];
  proflingModal.value = true;
  // document.body.style.overflow = "hidden";
  // const res = axios.get(`/getProfiling/${id}`);
  // if (res.status === 200) {
  //   console.log(res.data);
  // }
};

const formatRole = (val) => {
  switch (val) {
    case 0:
      return "Enterprise";
    case 1:
      return "Super Admin";
    default:
      return "N/A";
  }
};

onMounted(() => {
  if (localStorage.getItem("user.auth")) {
    userAccount.value = JSON.parse(localStorage.getItem("user.auth"));
    if (userAccount.value.role == 0) {
      isEnabledFields.value = true;
    }
  } else {
    router.push({ name: "admin" });
  }
  getAllUsers();
  getAllDeceased();
});

const getUserType = (val) => {
  switch (val) {
    case 1:
      return "Super Admin";
    case 0:
      return "Enterprise";
    default:
      return "N/A";
  }
};

const formatLocation = (val) => {
  switch (val) {
    case 1:
      return "OLD POBLACTION";
    case 2:
      return "EAST VALENCIA";
    case 3:
      return "BANBAN";
    default:
      return "N/A";
  }
};

const deceasedPerson = reactive({
  fullname: "",
  born: "",
  died: "",
  dateOfPermit: "",
  cemetery_location: "",
  latitude: "",
  longitude: "",
  tax_fullname: "",
  tax_contact: "",
  lapida: null,
  niche: "",
  constructions: "",
  excavation: "",
  address: "",
  date_of_permit: "",
});

const stateUser = reactive({
  fullname: "",
  idno: "",
  email: "",
  password: "12345678",
  usertype: "",
});

const logout = () => {
  localStorage.removeItem("user.auth");
  router.push({ name: "admin" });
};

const editUser = (id) => {
  const res = userlist.value.filter((item) => item.id == id);
  stateUser.fullname = res[0].fullname;
  stateUser.idno = res[0].idno;
  stateUser.email = res[0].email;
  stateUser.usertype = res[0].role;
  stateUser.id = id;
  modalTitle.value = "Edit";
  showModalUser.value = true;
};

const showModalUserFunc = () => {
  showModalUser.value = true;
  modalTitle.value = "Add";
  document.body.style.overflow = "hidden";
};
const closeModalUser = () => {
  stateUser.fullname = "";
  stateUser.idno = "";
  stateUser.email = "";
  stateUser.usertype = "";

  showModalUser.value = false;
  document.body.style.overflow = "";
};

const showModalDecease = () => {
  addDeceased.value = true;
  modalTitle.value = "Add";
  // document.body.style.overflow = "hidden";
};
const closeConfirm = () => {
  showConfirm.value = false;
};
const closeConfirmDeceased = () => {
  showConfirmDeceased.value = false;
};

const fileUploadHandler = (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    const imageFile = files[0];
    console.log(imageFile);
    $("#fileName").text(imageFile.name);
    deceasedPerson.lapida = imageFile;
  }
};

const deleteDeceased = (id) => {
  confirmIdToDelete.value = id;
  showConfirmDeceased.value = true;
};

const deleteUser = (id) => {
  confirmIdToDelete.value = id;
  showConfirm.value = true;
};
const confirmDeleteUser = async () => {
  const res = await axios.delete(`/delete/${confirmIdToDelete.value}`);
  console.log(res);
  if (res.status === 200 || res.status === 201) {
    console.log(res.data);
    userlist.value = userlist.value.filter(
      (item) => item.id != confirmIdToDelete.value
    );
    showConfirm.value = false;
    toast.success("Deleted successfully.", {
      position: "bottom",
    });
  }
};
const confirmDeleteDeceased = async () => {
  const res = await axios.delete(`/deleteDeceased/${confirmIdToDelete.value}`);
  if (res.status === 200 || res.status === 201) {
    deceasedList.value = deceasedList.value.filter(
      (item) => item.id != confirmIdToDelete.value
    );
    showConfirmDeceased.value = false;
    toast.success("Selected data has been deleted.", {
      position: "bottom",
    });
  }
};

const editDeceased = (id) => {
  console.log(deceasedList.value);
  const res = deceasedList.value.filter((item) => item.id == id);
  deceasedPerson.fullname = res[0].fullname;
  deceasedPerson.born = res[0].born;
  deceasedPerson.died = res[0].died;
  deceasedPerson.cemetery_location = res[0].cemetery_location;
  deceasedPerson.latitude = res[0].latitude;
  deceasedPerson.longitude = res[0].longitude;
  deceasedPerson.tax_fullname = res[0].tax_fullname;
  deceasedPerson.tax_contact = res[0].tax_contact;
  deceasedPerson.niche = res[0].niche;
  deceasedPerson.constructions = res[0].constructions;
  deceasedPerson.excavation = res[0].excavation;
  deceasedPerson.address = res[0].address;
  deceasedPerson.date_of_permit = res[0].date_of_permit;
  deceasedPerson.id = id;
  modalTitle.value = "Edit";
  addDeceased.value = true;
  // document.body.style.overflow = "hidden";
};

const closeModal = () => {
  deceasedPerson.fullname = "";
  deceasedPerson.born = "";
  deceasedPerson.died = "";
  deceasedPerson.cemetery_location = "";
  deceasedPerson.latitude = "";
  deceasedPerson.longitude = "";
  deceasedPerson.tax_fullname = "";
  deceasedPerson.tax_contact = "";
  addDeceased.value = false;
  document.body.style.overflow = "";
};

const submitUser = async () => {
  const res = await axios.post("/register", stateUser);
  if (res.status === 200 || res.status === 201) {
    toast.success("New user has been added successfully.", {
      position: "bottom",
    });
    const maxId = userlist.value.reduce((max, current) => {
      return current.id > max ? current.id : max;
    }, 0);
    stateUser.role = stateUser.usertype;
    userlist.value.push({ ...stateUser, id: maxId + 1 });
    showModalUser.value = false;
    document.body.style.overflow = "";
    stateUser.fullname = "";
    stateUser.idno = "";
    stateUser.email = "";
    stateUser.password = "12345678";
    stateUser.usertype = "";
  }
};

const updateUser = async () => {
  const decID = stateUser.id;
  console.log(decID);
  const res = await axios.put(`/update/${decID}`, stateUser);
  if (res.status === 200 || res.status === 201) {
    console.log(res.data);
    userlist.value = userlist.value.map((user) => {
      if (user.id == decID) {
        user.fullname = stateUser.fullname;
        user.idno = stateUser.idno;
        user.email = stateUser.email;
        user.usertype = stateUser.usertype;
        if (stateUser.usertype == 1) {
          user.usertype_text = "Super Admin";
        } else {
          user.usertype_text = "Enterprise";
        }
      }
      return user;
    });
    showModalUser.value = false;
    document.body.style.overflow = "";
    toast.success("Selected user has been updated successfully.", {
      position: "bottom",
    });
  }
};

const submitDeceasedPerson = async () => {
  const formData = new FormData();
  console.log(deceasedPerson.lapida);
  formData.append("fullname", deceasedPerson.fullname);
  formData.append("address", deceasedPerson.address);
  formData.append("died", deceasedPerson.died);
  formData.append("born", deceasedPerson.born);
  formData.append("cemetery_location", deceasedPerson.cemetery_location);
  formData.append("latitude", deceasedPerson.latitude);
  formData.append("longitude", deceasedPerson.longitude);
  formData.append("tax_fullname", deceasedPerson.tax_fullname);
  formData.append("tax_contact", deceasedPerson.tax_contact);
  formData.append("niche", deceasedPerson.niche);
  formData.append("constructions", deceasedPerson.constructions);
  formData.append("excavation", deceasedPerson.excavation);
  formData.append("date_of_permit", deceasedPerson.date_of_permit);

  formData.append("lapida", deceasedPerson.lapida);

  const res = await fetch("http://127.0.0.1:8000/api/addDeceased", {
    method: "POST",
    body: formData,
  });
  console.log(res);
  if (res.status === 200 || res.status === 201) {
    console.log("asdasdasd");
    const maxId = deceasedList.value.reduce((max, current) => {
      return current.id > max ? current.id : max;
    }, 0);
    deceasedPerson.cemetery_location = parseInt(
      deceasedPerson.cemetery_location
    );
    deceasedList.value.push({ ...deceasedPerson, id: maxId + 1 });
    console.log(deceasedList.value);
    toast.success("New decease person has been added successfully", {
      position: "bottom",
    });
    // document.body.style.overflow = "";
    addDeceased.value = false;
    deceasedPerson.fullname = "";
    deceasedPerson.born = "";
    deceasedPerson.died = "";
    deceasedPerson.cemetery_location = "";
    deceasedPerson.latitude = "";
    deceasedPerson.longitude = "";
    deceasedPerson.tax_fullname = "";
    deceasedPerson.tax_contact = "";
    deceasedPerson.address = "";
    deceasedPerson.dateOfPermit = "";
    deceasedPerson.niche = "";
    deceasedPerson.constructions = "";
    deceasedPerson.excavation = "";
  }
};
const updateDeceasedPerson = async () => {
  const decID = deceasedPerson.id;
  console.log(deceasedPerson);
  const res = await axios.put(`/updateDeceased/${decID}`, deceasedPerson);
  if (res.status === 200 || res.status === 201) {
    deceasedList.value = deceasedList.value.map((deceased) => {
      if (deceased.id == decID) {
        deceased.fullname = deceasedPerson.fullname;
        deceased.born = deceasedPerson.born;
        deceased.died = deceasedPerson.died;
        deceased.cemetery_location = parseInt(deceasedPerson.cemetery_location);
        deceased.latitude = deceasedPerson.latitude;
        deceased.longitude = deceasedPerson.longitude;
        deceased.tax_fullname = deceasedPerson.tax_fullname;
        deceased.tax_contact = deceasedPerson.tax_contact;
      }
      return deceased;
    });
    addDeceased.value = false;
    // document.body.style.overflow = "";
    toast.success("Deceased person has been successfully updated.", {
      position: "bottom",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
};
</script>
<style>
.title {
  color: #4c5c96;
}
input[type="date"] {
  padding: 10px;
  color: #3e4977;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #4c5c96;
  outline: none;
}
.field {
  border-color: #8994be !important;
}
.field:hover {
  border-color: #3e4977 !important;
}
.editbtn {
  background-color: #f7c500;
}
.editbtn:hover {
  background-color: #f3d044;
}
.success {
  background-color: #59b259;
}
.success:hover {
  background-color: #76ce76;
}
.deletebtn {
  background-color: #ca1d2f;
}
button {
  padding: 10px;
  height: auto;
}
.p-fileupload-choose {
  padding: 10px;
}
.dashboard-parent {
  width: 70%;
  margin: 0 auto;
  margin-top: 40px;
}
.img-parent {
  width: 100%;
  height: 30vh;
  border-radius: 10px;
}
.drp:hover ~ .drp-items {
  display: block !important;
}
.drp-items a {
  padding: 10px 15px;
  display: block;
}
.drp-items {
  position: absolute;
  z-index: 4;
  background-color: #5267b4;
  bottom: -600%;
  width: 350px;
  border-radius: 8px;
  display: none;
}
.drp-items:hover {
  display: block !important;
}
.admin-header {
  background-color: #4c5c96;
  padding: 10px 30px;
  margin-top: 20px;
  border-radius: 7px;
}
.admin-header .list-items {
  display: flex;
  gap: 30px;
  position: relative;
}
.admin-header ul li {
  list-style: none;
}
input[type="file"] {
  width: 140px;
  padding: 5px;
}
.img-parent {
  overflow: hidden;
}
.image {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 4;
}
.dashboard-parent table th {
  background-color: transparent;
  color: #fff;
}
table td {
  color: #ccc;
  padding: 10px 30px;
}

.p-paginator,
.p-datatable .p-datatable-tbody > tr {
  background-color: transparent;
}
.p-dropdown {
  background: transparent;
  padding: 10px;
  height: 65px;
  margin-left: 10px;
}
.p-dropdown-label {
  color: #fff !important;
}
</style>
