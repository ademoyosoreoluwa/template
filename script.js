const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select Media Stream, then play

async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.onplay();
        }
    } catch (error) {
        console.log('Whops, error here:', error);

    }
}

button.addEventListener('click', async() => {
    // Disable Button
    button.disabled = true;
    //  Start Picture in Picture 
    await videoElement.requestPictureInPicture();
    // Reset Button
    button.disabled = false;
})


// On Load
selectMediaStream();