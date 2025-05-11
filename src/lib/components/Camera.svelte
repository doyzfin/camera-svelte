<script lang="ts">
	let videoElement: HTMLVideoElement;
	let canvasElement: HTMLCanvasElement;
	let stream: MediaStream | null = null;
	let fileData: File | null = null;

	// Menangani akses kamera belakang
	const startCamera = async () => {
		try {
			// Akses kamera belakang dengan facingMode: 'environment'
			stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' } // Kamera belakang
			});
			videoElement.srcObject = stream; // Menampilkan stream ke video element
		} catch (err: any) {
			console.error('Error accessing the camera: ', err);
			if (err.name === 'NotAllowedError') {
				alert('Permission to access the camera was denied.');
			} else if (err.name === 'NotFoundError') {
				alert('No camera found on your device.');
			} else {
				alert('Something went wrong with the camera access.');
			}
		}
	};

	// Memeriksa izin akses kamera sebelum mencoba untuk mengakses
	const checkCameraPermission = async () => {
		try {
			const permissionStatus = await navigator.permissions.query({ name: 'camera' });
			if (permissionStatus.state === 'granted') {
				startCamera(); // Jika izin sudah diberikan, mulai kamera
			} else if (permissionStatus.state === 'denied') {
				alert('You have denied camera access. Please allow it in your browser settings.');
			} else {
				startCamera(); // Jika belum ada status izin, coba mulai kamera
			}
		} catch (err) {
			console.error('Error checking camera permissions: ', err);
		}
	};

	// Hentikan stream saat komponen dihancurkan
	const stopCamera = () => {
		if (stream) {
			const tracks = stream.getTracks();
			tracks.forEach((track) => track.stop()); // Hentikan kamera saat komponen dihancurkan
		}
	};

	// Menangkap foto dari kamera dan mengonversinya ke file
	const capturePhoto = () => {
		if (canvasElement && videoElement) {
			const context = canvasElement.getContext('2d');
			if (context) {
				// Gambar video ke dalam canvas
				context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

				// Mengonversi gambar menjadi data URL (base64 encoded)
				const dataUrl = canvasElement.toDataURL('image/png');

				// Mengonversi data URL menjadi file
				fetch(dataUrl)
					.then((res) => res.blob())
					.then((blob) => {
						fileData = new File([blob], 'photo.png', { type: 'image/png' });
						console.log('File captured: ', fileData);
					});
			}
		}
	};

	// Mengirim file ke input file
	const handleFileInput = () => {
		const fileInput = document.querySelector('#file-input') as HTMLInputElement;
		if (fileInput && fileData) {
			// Membuat DataTransfer untuk mengirim file ke input file
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(fileData);
			fileInput.files = dataTransfer.files;
		}
	};

	import { onMount, onDestroy } from 'svelte';

	onMount(() => {
		checkCameraPermission(); // Cek izin kamera saat komponen di-mount
	});

	onDestroy(() => {
		stopCamera(); // Hentikan kamera saat komponen di-destroy
	});
</script>

<main>
	<h1>Take a Photo</h1>

	<!-- Video feed from the camera -->
	<video bind:this={videoElement} autoplay playsinline></video>

	<!-- Canvas to capture the image (tapi disembunyikan) -->
	<canvas bind:this={canvasElement} width="640" height="480" style="display: none;"></canvas>

	<div>
		<button on:click={capturePhoto}>Capture</button>
	</div>

	<!-- Input file for uploading the captured photo -->
	<input type="file" id="file-input" style="display: none;" />
	<button on:click={handleFileInput}>Submit Photo</button>

	{#if fileData}
		<h2>Preview</h2>
		<img src={URL.createObjectURL(fileData)} alt="Captured Photo" />
	{/if}
</main>

<style>
	video {
		width: 100%;
		height: auto;
		border: 1px solid black;
	}
</style>
