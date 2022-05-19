<script lang="ts">
	import Header from "./components/Header.svelte";
	let isTrue = true;

	const exampleFunc = () => {
		isTrue = !isTrue;
	};

	const signup = async () => {
		const ts = new Date().getTime();
		const testData = {
			"password": "abc123d",
    		"email": "steve" + ts + "@test.com",
    		"first_name": "Steve",
    		"last_name": "Giordano",
			"user_id": "fake"
		}

		const data = await fetch("http://127.0.0.1:3001/users/signup", {
			method: "POST",
			body: JSON.stringify(testData)
		});

		const response = await data.json();

		console.log(response);
	}

</script>

<div>
	<Header />
	{#if isTrue}
		<p>Click and I disappear</p>
	{/if}

	<button on:click={exampleFunc}>Click Me</button>
	<button on:click={signup}>Signup</button>

</div>
