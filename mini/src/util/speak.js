export default function speak( text ){
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        synth.cancel();
        var utterThis = new SpeechSynthesisUtterance(text);
        synth.speak(utterThis);
    }
    else{
        console.log("Error")
    }
}