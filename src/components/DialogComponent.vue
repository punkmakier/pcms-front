<template>
	<div class="dialog-custom">
		<div class="dialog-child">
			<div class="dialog-header">
				<h3>{{ title }}</h3>
				<span @click="$emit('closeModal')" style="cursor: pointer">X</span>
			</div>
			<div class="dialog-body">
				<slot name="bodyDialog"></slot>
			</div>
			<div class="dialog-footer">
				<button class="btnclose" @click="$emit('closeModal')">Close</button>
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { defineProps } from "vue";

	const props = defineProps({
		title: String,
	});
</script>
<style>
	.dialog-footer {
		padding: 15px;
		display: flex;
		justify-content: end;
		gap: 10px;
	}
	.btnclose {
		background-color: #ccc;
		padding: 10px;
		height: auto;
	}
	.btnclose:hover {
		background-color: #6d6d6d;
	}
	.dialog-header {
		display: flex;
		justify-content: space-between;
		padding: 15px;
	}
	.dialog-body {
		padding: 15px;
	}
	.dialog-header h3 {
		color: #000;
	}
	.dialog-custom {
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.dialog-child {
		width: 50rem;
		margin: 10px;
		height: auto;
		background-color: #fff;
		border-radius: 10px;
		color: #000;
	}
</style>
