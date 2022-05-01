<script lang="ts">
	import Header from "./components/Header.svelte";
	let isTrue = true;

	const exampleFunc = () => {
		isTrue = !isTrue;
	};
</script>

<div>
	<Header />
	{#if isTrue}
		<p>Click and I disappear</p>
	{/if}

	<button on:click={exampleFunc}>Click Me</button>
</div>
