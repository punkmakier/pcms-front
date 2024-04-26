<template>
  <div class="confirm-parent">
    <div class="confirm-child">
      <div class="confirm-body">
        <slot name="bodyConfirm"></slot>
      </div>
      <div class="confrim-footer">
        <button class="btnclose" @click="$emit('closeConfirm')">Close</button>
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
.confrim-footer {
  padding: 15px;
  display: flex;
  justify-content: center;
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
.confirm-body {
  padding: 15px;
  text-align: center;
}
.dialog-header h3 {
  color: #000;
}
.confirm-parent {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-child {
  width: 25rem;
  margin: 10px;
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  color: #000;
}
</style>
