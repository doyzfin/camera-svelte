<script lang="ts">
	import Camera from '$lib/components/Camera.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Pattern from '$lib/images/pattern.svg';

	const buttonClick = () => {
		console.log('MASUK');
	};
</script>

<svelte:head>
	<title>Body</title>
</svelte:head>

<section>
	<Camera />
</section>

<style lang="postcss">
	section {
		@apply min-w-[100vw] min-h-screen bg-[#f4f4f4] font-poppins;
	}

	.background {
		@apply fixed w-[100vw] h-[100vh] top-0 left-0 m-0 p-0 bg-[#757575] overflow-hidden;
	}

	.background li {
		@apply absolute block list-none w-[20px] h-[20px] bg-[#ffffff33] animate-custom-animate;
	}

	.background li:nth-child(0) {
		@apply left-[10%] w-[254px] h-[254px] -bottom-[254px] delay-1s;
	}

	.background li:nth-child(1) {
		@apply left-[25%] w-[370px] h-[370px] -bottom-[370px] delay-4s;
	}

	.background li:nth-child(2) {
		@apply left-[40%] w-[130px] h-[130px] -bottom-[130px] delay-10s;
	}

	.background li:nth-child(3) {
		@apply left-[5%] w-[342px] h-[342px] -bottom-[342px] delay-10s;
	}

	.background li:nth-child(4) {
		@apply left-[25%] w-[287] h-[287] -bottom-[287] delay-14s;
	}

	.background li:nth-child(5) {
		@apply left-[44%] w-[320px] h-[320px] -bottom-[320px] delay-11s;
	}

	.background li:nth-child(6) {
		@apply left-[15%] w-[173] h-[173] -bottom-[173] delay-6s;
	}

	.wrapper {
		@apply flex items-center justify-center h-screen m-auto;
	}

	.form-wrapper {
		@apply w-full mb-4 text-white;
	}
</style>
