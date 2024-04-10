<template>
	<div>
		<!-- Page Wrapper -->
		<div id="page-wrapper">
			<!-- Header -->
			<header id="header" class="alt">
				<nav>
					<a href="#menu">Menu</a>
				</nav>
			</header>

			<!-- Banner -->
			<section id="banner">
				<div class="bgdark"></div>
				<div class="inner">
					<img src="/src/assets/images/logo.png" style="width: 150px" />
					<h3>BUENAVISTA, GUIMARAS</h3>
					<h2>PUBLIC CEMETERY MANAGEMENT SYSTEM</h2>
					<p><i>(OLD POBLACION | EAST VALENCIA | BANBAN CEMETERY)</i></p>
					<div
						style="
							margin-top: 30px;
							display: flex;
							align-items: center;
							gap: 10px;
						">
						<div style="width: 40%">
							<input
								type="text"
								name="demo-name"
								id="demo-name"
								value=""
								placeholder="Search by complete name..."
								style="border-color: #fff !important" />
						</div>
						<a href="#" class="button primary">Search</a>
					</div>
				</div>
			</section>

			<!-- Wrapper -->
			<section id="wrapper">
				<!-- One -->
				<section id="one" class="wrapper spotlight style1">
					<div class="inner">
						<a href="javascript:void(0)" class="image">
							<img src="/src/assets/images/cem3.jpg" alt="" />
						</a>
						<div class="content">
							<h2 class="major">OLD POBLACION</h2>
							<p>
								Lorem ipsum dolor sit amet, etiam lorem adipiscing elit. Cras
								turpis ante, nullam sit amet turpis non, sollicitudin posuere
								urna. Mauris id tellus arcu. Nunc vehicula id nulla dignissim
								dapibus. Nullam ultrices, neque et faucibus viverra, ex nulla
								cursus.
							</p>
						</div>
					</div>
				</section>

				<!-- Two -->
				<section id="two" class="wrapper alt spotlight style2">
					<div class="inner">
						<a href="javascript:void(0)" class="image">
							<img src="/src/assets/images/cem2.webp" alt="" />
						</a>
						<div class="content">
							<h2 class="major">EAST VALENCIA CEMETERY</h2>
							<p>
								Lorem ipsum dolor sit amet, etiam lorem adipiscing elit. Cras
								turpis ante, nullam sit amet turpis non, sollicitudin posuere
								urna. Mauris id tellus arcu. Nunc vehicula id nulla dignissim
								dapibus. Nullam ultrices, neque et faucibus viverra, ex nulla
								cursus.
							</p>
						</div>
					</div>
				</section>

				<!-- Three -->
				<section id="three" class="wrapper spotlight style3">
					<div class="inner">
						<a href="javascript:void(0)" class="image">
							<img src="/src/assets/images/cem1.webp" alt="" />
						</a>
						<div class="content">
							<h2 class="major">BANBAN CEMETERY</h2>
							<p>
								Lorem ipsum dolor sit amet, etiam lorem adipiscing elit. Cras
								turpis ante, nullam sit amet turpis non, sollicitudin posuere
								urna. Mauris id tellus arcu. Nunc vehicula id nulla dignissim
								dapibus. Nullam ultrices, neque et faucibus viverra, ex nulla
								cursus.
							</p>
						</div>
					</div>
				</section>
			</section>

			<!-- Footer -->
			<section id="footer">
				<div class="inner">
					<h2 class="major">Get in touch</h2>
					<p>
						Easily reach out to us via our 'Get in Touch' function within our
						Cemetery Mapping System, ensuring prompt assistance and support for
						any queries or assistance you may require.
					</p>
					<form method="post" action="#">
						<div class="fields">
							<div class="field">
								<label for="name">Name</label>
								<input type="text" name="name" id="name" />
							</div>
							<div class="field">
								<label for="email">Email</label>
								<input type="email" name="email" id="email" />
							</div>
							<div class="field">
								<label for="email">Cemetery Name</label>
								<input type="text" name="cemetery" id="cemetery" />
							</div>
							<div class="field">
								<label for="message">Message</label>
								<textarea name="message" id="message" rows="4"></textarea>
							</div>
							<div class="field">
								<input type="checkbox" id="demo-copy" name="demo-copy" />
								<label for="demo-copy"
									>I agree to receive other communications from Municipality of
									Buenavista Guimaras</label
								>
							</div>
						</div>
						<ul class="actions">
							<li><input type="submit" value="Send Message" /></li>
						</ul>
					</form>
					<ul class="contact">
						<li class="icon solid fa-home">
							Buenavista Town Hall,<br />
							Buenavista Municipal Compound, #2894<br />
							Buenavista, Guimaras
						</li>
						<li class="icon solid fa-phone">09000000001</li>
						<li class="icon solid fa-envelope">
							<a href="#">buenavista@gmail.com</a>
						</li>

						<li class="icon brands fa-facebook-f">
							<a href="#">Municipality of Buenavista</a>
						</li>
					</ul>
					<ul class="copyright">
						<li>
							&copy; BUENAVISTA, GUIMARAS, PUBLIC CEMETERY MANAGEMENT SYSTEM.
							All rights reserved.
						</li>
					</ul>
				</div>
			</section>
		</div>
		<Teleport to="#menu">
			<!-- Menu -->
			<div class="inner">
				<h2>Menu</h2>
				<ul class="links">
					<li><a href="#header">Home</a></li>
					<li><a href="#wrapper">About</a></li>
					<li><a href="#footer">Contact</a></li>
				</ul>
				<a href="#" class="close">Close</a>
			</div>
		</Teleport>
	</div>
</template>
<script setup></script>
<style>
	#banner {
		position: relative;
		background-image: url("/src/assets/images/buenavista.jpg");
		z-index: 1;
		height: 90vh !important;
	}
	#banner .bgdark {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7); /* Adjust opacity as needed */
		z-index: -1; /* Ensure it's behind the content */
	}

	.wrapper.spotlight {
		background-color: #4c5c96;
	}

	.wrapper {
		background-color: #2e3141;
		margin: 0;
		padding: 6.5em 0;
		position: relative;
	}

	.wrapper.spotlight .image img {
		width: 100% !important;
		height: 300px !important;
		border-radius: 3px !important;
	}
</style>
