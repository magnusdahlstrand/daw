(async function(DAW) {
	DAW.record = record;

	async function record() {
		const stream = await navigator.mediaDevices.getUserMedia({audio:true});
		const recorder = new MediaRecorder(stream);
		var chunks = [];
		recorder.ondataavailable = (ev) => {
			chunks.push(ev.data);
			// If the recording has stopped, save the file
			if(recorder.state === 'inactive') {
				const blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
				saveBlob(blob, `${new Date()}.ogg`);
			}
		};
		DAW.on(window, 'keyup', (ev) => {
			if(ev.which !== 32) {
				return;
			}
			if(recorder.state !== 'recording') {
				chunks = [];
				recorder.start();
				document.body.classList.add('is-recording');
				console.log('...recording...');
			}
			else {
				console.log('stop');
				document.body.classList.remove('is-recording');
				recorder.stop();
			}
		})
	}

	function saveBlob(blob, name) {
		const a = document.createElement('a');
		const url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = name;
		a.click();
		window.URL.revokeObjectURL(url);
	}

}(window.DAW))