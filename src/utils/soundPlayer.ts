import {Howl, type HowlOptions} from "howler";
import {onDestroy} from "svelte";
import {writable} from "svelte/store";

export const createSoundPlayer = (config: HowlOptions) => {
	const progress = writable(0);
	const isPlaying = writable(false);
	const isFading = writable(false);
	const isLoading = writable(true);

	const sound = new Howl(config);

	const seek = () => {
		progress.set(sound.seek() / sound.duration() * 100);

		if (!sound.playing()) {
			return
		}

		requestAnimationFrame(seek);
	}

	const fadeOut = (pause: boolean = false) => {
		isFading.set(true)

		sound.once("fade", () => {
			pause ? sound.pause() : sound.stop();
			isFading.set(false)
			sound.volume(1);
		})

		sound.fade(1, 0, 3000);
	}

	const fadeIn = () => {
		isFading.set(true)

		sound.once("fade", () => {
			isFading.set(false)
		})

		sound.play();
		sound.fade(0, 1, 3000);
	}

	const onPlay = () => {
		isPlaying.set(true)
		seek();
	}

	const onPause = () => {
		isPlaying.set(false)
	}

	const onStop = () => {
		isPlaying.set(false)
	}

	const onEnd = () => {
		if (!sound.loop()) {
			isPlaying.set(false)
		}
	}

	const onLoad = () => {
		isLoading.set(false)
	}

	sound.on("play", onPlay);
	sound.on("pause", onPause);
	sound.on("stop", onStop);
	sound.on("end", onEnd)
	sound.on("load", onLoad);

	onDestroy(() => {
		sound.stop();
		sound.off();
		sound.unload();

	})

	return {
		progress,
		isPlaying,
		isFading,
		isLoading,
		sound: {
			play: () => sound.play(),
			pause: () => sound.pause(),
			playing: () => sound.playing(),
			stop: () => sound.stop(),
			fadeIn,
			fadeOut
		}
	}
}