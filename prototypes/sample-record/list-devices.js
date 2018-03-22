(async function(DAW) {
	DAW.devices = await setup();
	console.log(DAW.devices);

	DAW.emit('devices:ready');

	async function setup() {
		const devices = await navigator.mediaDevices.enumerateDevices();
		return {
			input: devices.filter(({kind}) => kind === 'audioinput'),
			output: devices.filter(({kind}) => kind === 'audiooutput'),
		};
	}

}(window.DAW))