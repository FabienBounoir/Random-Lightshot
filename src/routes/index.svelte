<script setup>
    let src = "https://media.discordapp.net/attachments/806282416364585062/981494347713372170/chargement.gif"
    let link = ""
    let disabled = false

    //random body background
    const randomColor = () => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        return `rgb(${r}, ${g}, ${b})`
    }


    const gett = async () => {
        disabled = true
        let imageInfo = await fetch('/api/screenFetch', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
            }
		}).then((res) => res.json());

        console.log(imageInfo, imageInfo.imageLink);

        src = imageInfo.imageLink
        link = imageInfo.link
        disabled = false
    }

    const goto = () => {
        window.open(link, '_blank');
    }

    //change background color
    const changeColor = () => {
        document.body.style.backgroundColor = randomColor()
    }

    changeColor()
    gett()
</script>

<svelte:head>
	<title>Random lightshot screenshot</title>
</svelte:head>

<img {src} alt="" on:click={goto} />
<!-- <input type="url" bind:value={src} /> -->
<button on:click={gett} disabled={disabled} >Get new screenshot</button>




<style lang="scss">
	button {
		font: inherit;
		position: absolute;

		top: calc(50% + 10em);
		left: 50%;

		transform: translate(-50%, -50%);

		border: none;
		padding: 0.5em;
		border-radius: 0.5em;
		width: 20em;
		outline: none;
		z-index: 11;

		box-shadow: 0 0 1em rgba(black, 0.1);
	}

    button:hover{
        box-shadow: 0 0 1em rgba(black, 0.3);
    }

    button:disabled{
        box-shadow: 0 0 1em rgba(black, 0.1);
        opacity: 0.5;
    }

	img {
		position: absolute;

		top: 45%;
		left: 50%;

		transform: translate(-50%, -50%);

		display: block;
		border-radius: 1em;
		height: 25em;
		object-fit: cover;
		z-index: 10;
		border: none;

		box-shadow: 0 0 1em rgba(black, 0.1);
	}

	.colors {
		display: flex;
		height: 100vh;
	}

	.color {
		position: relative;
		flex: 1;
		background-color: currentColor;
		transition: 400ms ease color;

		p {
			position: absolute;
			text-align: center;
			color: white;
			font-weight: 900;

			top: 85%;
			left: 50%;
			transform: translate(-50%, -50%);

			padding: 0.25em 0.5em;
			border-radius: 0.5em;
			background-color: rgba(black, 0.25);
		}
	}
</style>
