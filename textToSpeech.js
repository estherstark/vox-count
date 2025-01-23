let speech = new SpeechSynthesisUtterance();
speech.lang = "th";

let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  let voiceSelect = document.querySelector("#voices");
  voices.forEach(
    (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
  );
};

document.querySelector("#rate").addEventListener("input", () => {
  const rate = document.querySelector("#rate").value;
  speech.rate = rate;
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#volume").addEventListener("input", () => {
  const volume = document.querySelector("#volume").value;
  speech.volume = volume;
  document.querySelector("#volume-label").innerHTML = volume;
});

document.querySelector("#pitch").addEventListener("input", () => {
  const pitch = document.querySelector("#pitch").value;
  speech.pitch = pitch;
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
  speech.voice = voices[document.querySelector("#voices").value];
});

document.querySelector("#start-tts").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});

document.querySelector("#pause-tts").addEventListener("click", () => {
  window.speechSynthesis.pause();
});

document.querySelector("#resume-tts").addEventListener("click", () => {
  window.speechSynthesis.resume();
});

document.querySelector("#cancel-tts").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});

function populateVoiceList() {
  voices = speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.includes("th-TH")); // Only Thai voices
  // Thai and US English voices
  // .filter(voice) => voice.lang.includes("th-TH") || voice.lang.includes("en-US")
  // );

  if (voices.length === 0) {
    console.log("No Thai voices found");
    return;
  }

  const voiceSelect = document.querySelector("#voices");
  voiceSelect.innerHTML = "";

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = index;
    voiceSelect.appendChild(option);
  });
}
speechSynthesis.addEventListener("voiceschanged", populateVoiceList);
