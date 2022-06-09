<script lang="ts">
	import Header from "./components/Header.svelte";
	let isTrue = true;

	const exampleFunc = () => {
		isTrue = !isTrue;
	};

	const signup = async () => {
		const ts = new Date().getTime();
		const testData = {
			password: "abc123d",
			email: "steve" + ts + "@test.com",
			first_name: "Steve",
			last_name: "Giordano",
			user_id: "fake"
		};

		const data = await fetch("https://api.momus.io/users/signup", {
			method: "POST",
			body: JSON.stringify(testData),
			mode: "cors",
			headers: {
				"Access-Control-Allow-Origin": "https://api.momus.io",
				"Access-Control-Allow-Origin-Credentials": "true",
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			credentials: "include"
		});

		const response = await data.json();

		console.log(response);
	};
</script>

<div>
	<Header />
	{#if isTrue}
		<p>Click and I disappear</p>
	{/if}

	<button on:click={exampleFunc}>Click Me</button>
	<button on:click={signup}>Signup</button>
</div>
