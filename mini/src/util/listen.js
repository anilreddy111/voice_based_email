export default function listen(setFunc){
    let recognization = new window.webkitSpeechRecognition();
    recognization.onstart = () => {
        console.log("Listening...")
    }
    recognization.onresult = (e) => {
        var transcript = e.results[0][0].transcript;
        console.log(transcript)
        setFunc(transcript)
    }
    recognization.start();
}