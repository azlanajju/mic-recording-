  
  
  
  // Get a reference to the audio and record button elements
  const audioElement = document.getElementById('recording');
  const recordButton = document.getElementById('record-button');

  // Set up a MediaRecorder object to record the audio
  let mediaRecorder;

  // Set up a function to handle starting and stopping the recording
  function toggleRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      // Stop the recording
      mediaRecorder.stop();
      audioElement.srcObject = null;
      recordButton.innerHTML = '<i class="fa fa-microphone"></i>';
      recordButton.classList.remove("blink");
      document.querySelector('audio').style.display='block';


    } else {
      // Start the recording
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        audioElement.srcObject = stream;
        mediaRecorder = new MediaRecorder(stream);

        // Set up a handler to process the recorded audio data
        const chunks = [];
        mediaRecorder.addEventListener('dataavailable', event => {
          chunks.push(event.data);
        });

        // Set up a handler to play the recorded audio when recording is finished
        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(chunks);
          audioElement.src = URL.createObjectURL(audioBlob);
        });

        // Start the recording
        mediaRecorder.start();
        recordButton.innerHTML = '◉';
        
        recordButton.classList.add("blink");
      });
    }
  }

  // Add a click event listener to the record button
  recordButton.addEventListener('click', toggleRecording); 
  var audioUrl = URL.createObjectURL(audioBlob);
 audioElement = document.getElementById('audio');
audioElement.src = audioUrl;
audioElement.play();




