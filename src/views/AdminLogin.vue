<template>
	<div class="admin-login">
		<div class="bgdark"></div>
		<h2>BUENAVISTA, GUIMARAS</h2>
		<h1>PUBLIC CEMETERY MANAGEMENT SYSTEM</h1>
		<h3><i>(OLD POBLACION | EAST VALENCIA | BANBAN CEMETERY)</i></h3>

		<div style="margin-top: 70px; width: 30%">
			<div>
				<label for="email" class="title-field">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					value=""
					style="border-color: #fff !important" />
			</div>
			<div style="margin-top: 30px">
				<label for="password" class="title-field">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					value=""
					style="border-color: #fff !important" />
			</div>
			<div style="margin-top: 30px">
				<a href="#" class="button primary" style="width: 100%">Login</a>
			</div>
		</div>
	</div>
</template>
<script setup></script>
<style>
	.admin-login h1,
	.admin-login h2,
	.admin-login h3 {
		text-shadow: 0 0 3px #000;
	}
	.admin-login {
		position: relative;
		background-image: url("/src/assets/images/buenavista.jpg");
		height: 100vh;
		width: 100%;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.admin-login .bgdark {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: -1;
	}
	.title-field {
		text-shadow: 0 0 3px #000;
	}
</style>
