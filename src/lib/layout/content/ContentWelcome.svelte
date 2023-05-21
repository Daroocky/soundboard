<script>
    import Sound from "../../ui/Sound.svelte";
    import {setContext} from "svelte";
    import Card from "../../ui/intro/Card.svelte";
    import {fly} from "svelte/transition";

    export let groups; //To hide the warning

    setContext("group", "demo");
</script>

<section class="grid" transition:fly={{ x: -352 }}>
	<div class="box welcome">
		<h1>Welcome to your soundboard</h1>
	</div>

	<Card icon="account_circle" title="No account">
		<p>You don't have to create a account. Just click on "Edit" and start creating your soundboard.</p>
	</Card>


	<Card icon="save" title="All local">
		<p>All files and settings are stored locally on your device.</p>
	</Card>


	<div class="box info">
		<p>Create your own custom soundboard directly in your browser.</p>
		<ul>
			<li>Create groups to organise your sounds</li>
			<li>Loop sounds</li>
			<li>Change the volume of each sound or each group</li>
		</ul>
	</div>

	<Sound
	 blob="src/assets/sound.mp3"
	 id="demo"
	 title="Intro Sound"
	 waveform=""
	/>

	<Card icon="payments" title="It's free">
		<p>This tool is completely free. But if you like you can support our work here.</p>
	</Card>


</section>

<style lang="scss">
	.grid {
		display: grid;
		width: min(100vw, 1200px);
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 1rem;
		grid-template-areas:
    "welcome welcome welcome info1 info2"
    "welcome welcome welcome info info"
    "info3 sound sound info info";

		:nth-child(1) {
			grid-area: welcome;
		}

		:nth-child(2) {
			grid-area: info1;
		}

		:nth-child(3) {
			grid-area: info2;
		}

		:nth-child(4) {
			grid-area: info;
		}

		:global(:nth-child(5)) {
			grid-area: sound;
		}

		:nth-child(6) {
			grid-area: info3;
		}
	}

	.box {
		border-radius: var(--radius-normal);
		background-color: var(--color-gray-900);
	}

	.welcome {
		padding: 3rem;

		h1 {
			font-size: 3.5rem;
			line-height: 1;
			margin: 0;
		}
	}

	.info {
		font-size: 1.2rem;
		padding: 2rem;

		p {
			margin: 0;
		}
	}

</style>