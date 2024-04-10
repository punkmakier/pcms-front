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
		<h3>good day, Makier!</h3>
		<div class="admin-header">
			<div
				style="
					display: flex;
					justify-content: space-between;
					align-items: center;
				">
				<div class="list-items">
					<a href="javascript:void(0)" @click="current_tab = 'records'"
						>Records</a
					>
					<a href="javascript:void(0)" @click="current_tab = 'notification'"
						>Notifications</a
					>
					<a href="javascript:void(0)" @click="current_tab = 'accounts'"
						>Accounts</a
					>
				</div>

				<div>
					<a href="#">Logout</a>
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
						<Column field="no" header="No"></Column>
						<Column field="fullname" header="Full Name"></Column>
						<Column field="born" header="Born"></Column>
						<Column field="died" header="Died"></Column>
						<Column field="location" header="Cemetery Location"></Column>
						<Column header="Action">
							<template #body="slotProps">
								<div style="display: flex; gap: 15px">
									<button
										class="editbtn"
										@click="editDeceased(slotProps.data.no)">
										Edit
									</button>
									<button
										class="deletebtn"
										@click="deleteDeceased(slotProps.data.no)">
										Delete
									</button>
								</div>
							</template>
						</Column>
					</DataTable>
				</div>
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
						<Column field="usertype_text" header="User Type"></Column>
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
						class="field" />
				</div>

				<div style="margin-top: 10px; display: flex; gap: 10px">
					<div style="flex-grow: 1">
						<label for="demo-name" class="title">Born</label>
						<input
							type="date"
							v-model="deceasedPerson.born"
							id="demo-name"
							class="field" />
					</div>
					<div style="flex-grow: 1">
						<label for="demo-name" class="title">Died</label>
						<input
							type="date"
							v-model="deceasedPerson.died"
							id="demo-name"
							class="field" />
					</div>
				</div>
				<div style="margin-top: 10px">
					<label for="demo-name" class="title">Cemetery Location</label>

					<select
						v-model="deceasedPerson.cemetery_location"
						id="demo-category"
						class="field">
						<option>-</option>
						<option value="1">OLD POBLACION</option>
						<option value="2">EAST VALENCIA</option>
						<option value="3">BANBAN</option>
					</select>
				</div>
				<div style="margin-top: 10px; display: flex; gap: 10px">
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
				<small>TAXPAYER INFORMATION</small>
				<div style="margin-top: 10px; display: flex; gap: 10px">
					<div style="flex-grow: 1">
						<label for="demo-name" class="title">Complete Name</label>
						<input
							type="text"
							v-model="deceasedPerson.tax_fullname"
							id="demo-name"
							class="field" />
					</div>
					<div style="flex-grow: 1">
						<label for="demo-name" class="title">Contact No.</label>
						<input
							type="text"
							v-model="deceasedPerson.tax_contact"
							id="demo-name"
							class="field" />
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
						<option value="2">Enterprise</option>
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
	</div>
</template>
<script setup>
	import { ref, reactive } from "vue";
	import DialogComponent from "@/components/DialogComponent.vue";
	import ConfirmComponent from "@/components/ConfirmComponent.vue";
	import { Autoplay } from "swiper/modules";
	import { Swiper, SwiperSlide } from "swiper/vue";
	import "swiper/css";
	const current_tab = ref("records");
	const addDeceased = ref(false);
	const showModalUser = ref(false);
	const showConfirm = ref(false);
	const showConfirmDeceased = ref(false);

	const confirmIdToDelete = ref();
	const modalTitle = ref("Add");
	const images = ref(["cem1.webp", "cem2.webp", "cem3.jpg"]);
	const deceasedList = ref([
		{
			no: 1,
			fullname: "test",
			born: "2023-03-19",
			died: "2023-03-19",
			cemetery_location: "1",
			location: "OLD POBLACTION",
			latitude: "23.435.545",
			longitude: "12.43.545.65",
			tax_fullname: "Maks",
			tax_contact: "09048541",
		},
		{
			no: 2,
			fullname: "test2",
			born: "2023-03-19",
			died: "2023-03-19",
			cemetery_location: "3",
			latitude: "23.435.545",
			location: "BANBAN",
			longitude: "12.43.545.65",
			tax_fullname: "Maks",
			tax_contact: "09048541",
		},
	]);

	const userlist = ref([
		{
			id: 1,
			fullname: "maks",
			idno: "123",
			email: "maks",
			usertype: "1",
			usertype_text: "Super Admin",
		},
	]);

	const deceasedPerson = reactive({
		fullname: "",
		born: "",
		died: "",
		cemetery_location: "",
		latitude: "",
		longitude: "",
		tax_fullname: "",
		tax_contact: "",
	});

	const stateUser = reactive({
		fullname: "",
		idno: "",
		email: "",
		password: "123456",
		usertype: "",
	});

	const editUser = (id) => {
		const res = userlist.value.filter((item) => item.id == id);
		stateUser.fullname = res[0].fullname;
		stateUser.idno = res[0].idno;
		stateUser.email = res[0].email;
		stateUser.usertype = res[0].usertype;
		stateUser.id = id;
		modalTitle.value = "Edit";
		showModalUser.value = true;
		console.log(res);
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
		document.body.style.overflow = "hidden";
	};
	const closeConfirm = () => {
		showConfirm.value = false;
	};

	const deleteDeceased = (id) => {
		confirmIdToDelete.value = id;
		showConfirmDeceased.value = true;
	};

	const deleteUser = (id) => {
		confirmIdToDelete.value = id;
		showConfirm.value = true;
	};
	const confirmDeleteUser = () => {
		userlist.value = userlist.value.filter(
			(item) => item.id != confirmIdToDelete.value
		);
		showConfirm.value = false;
	};
	const confirmDeleteDeceased = () => {
		deceasedList.value = deceasedList.value.filter(
			(item) => item.no != confirmIdToDelete.value
		);
		showConfirmDeceased.value = false;
	};

	const editDeceased = (id) => {
		const res = deceasedList.value.filter((item) => item.no == id);
		deceasedPerson.fullname = res[0].fullname;
		deceasedPerson.born = res[0].born;
		deceasedPerson.died = res[0].died;
		deceasedPerson.cemetery_location = res[0].cemetery_location;
		deceasedPerson.latitude = res[0].latitude;
		deceasedPerson.longitude = res[0].longitude;
		deceasedPerson.tax_fullname = res[0].tax_fullname;
		deceasedPerson.tax_contact = res[0].tax_contact;
		deceasedPerson.id = id;
		modalTitle.value = "Edit";
		addDeceased.value = true;
		document.body.style.overflow = "hidden";
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

	const submitUser = () => {
		console.log(stateUser);
	};

	const updateUser = () => {
		console.log(stateUser);
		const decID = stateUser.id;
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
	};

	const submitDeceasedPerson = () => {
		console.log(deceasedPerson);
	};
	const updateDeceasedPerson = () => {
		const decID = deceasedPerson.id;
		deceasedList.value = deceasedList.value.map((deceased) => {
			if (deceased.no == decID) {
				deceased.fullname = deceasedPerson.fullname;
				deceased.born = deceasedPerson.born;
				deceased.died = deceasedPerson.died;
				deceased.cemetery_location = deceasedPerson.cemetery_location;
				deceased.latitude = deceasedPerson.latitude;
				deceased.longitude = deceasedPerson.longitude;
				deceased.tax_fullname = deceasedPerson.tax_fullname;
				deceased.tax_contact = deceasedPerson.tax_contact;
				if (deceasedPerson.cemetery_location == 1) {
					deceased.location = "OLD POBLACION";
				} else if (deceasedPerson.cemetery_location == 2) {
					deceased.location = "EAST VALENCIA";
				} else {
					deceased.location = "BANBAN";
				}
			}
			return deceased;
		});
		addDeceased.value = false;
		document.body.style.overflow = "";
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
	.admin-header {
		background-color: #4c5c96;
		padding: 10px 30px;
		margin-top: 20px;
		border-radius: 7px;
	}
	.admin-header .list-items {
		display: flex;
		gap: 30px;
	}
	.admin-header ul li {
		list-style: none;
	}
	.img-parent {
		overflow: hidden;
	}
	.image {
		width: 100%;
		object-fit: cover;
		aspect-ratio: 4;
	}
	table th {
		background-color: transparent;
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
