const vokabular = [{
  "q": "FOH (Front of House)",
  "a": "Der Platz vor der Bühne, an dem die Technik die steht und die Techniker sich ihre Zeit vertreiben."
}, {
  "q": "Fader",
  "a": "Ein Schieberegler."
}, {
  "q": "Gain",
  "a": "Die Vorverstärkung eines Audiosignals am Mischpult, bevor das Signal prozessiert wird."
}, {
  "q": "Poti (Potentiometer)",
  "a": "Ein Drehregler."
}, {
  "q": "EQ (Equalizer)",
  "a": "Potis zum Verstellen der Frequenzen der Audio.\nSprich: Finetuning."
}, {
  "q": "Stagebox",
  "a": "Eine Anschlussbox für Tonkabel."
}, {
  "q": "Multicore",
  "a": "Ein Bündel an an Tonkabeln, die zu einem dicken Kabel zusammen kommen."
}, {
  "q": "Talkback",
  "a": "Ein Mikrofon des Tontechnikers, das auf die Monitore geht."
}, {
  "q": "God-Mic",
  "a": "Ein Mikrofon des Tontechnikers, das auf allen Lautsprechern zu hören ist. Hauptsächlich wird es als Ansagemikrofon oder 'Notfall'-Mikrofon benutzt."
}, {
  "q": "PFL (Pre-Fader-Listening)",
  "a": "Durch Knopfdruck kann man das Audiosignal auf dem/den ausgewählten Fader/n vorhören (auf den an den Pult angeschlossenen Kopfhörern) und den Ausschlag des Signals auf dem Levelmeter des Pults angezeigt."
}, {
  "q": "Monitor",
  "a": "Lautsprecher, über den die Darsteller/Musiker einen bestimmten Mix hören (z.B. beim Singen sich selbst oder das jeweilige Instrument, das man spielt)."
}, {
  "q": "AUX",
  "a": "Es besteht die Möglichkeit einen bestimmten/anderen/eigenen Mix über einen Auxweg auszusenden (z.B. Monitor, Kamera, Lichtpul -> nur Musik, etc.)"
}, {
  "q": "Mix",
  "a": "Eine bestimmte Tonabmischung (z.B. Main-Mix, Monitor-Mix, etc.)."
}, {
  "q": "Powermixer",
  "a": "Ein Mischpult mit einer eingebauten Endstufe."
}, {
  "q": "Endstufe",
  "a": "Ein Verstärker der benötigt wird, wenn man passive Lautsprecher benutzt. Ein aktiver Lautsprecher hat diese Endstufe bereits eingebaut."
}, {
  "q": "Feedback/Rückkopplung",
  "a": "Das Mikrofon nimmt den eigenen aufgenommenen Schall aus dem Lautsprecher wieder auf und es fängt an ein Ton sehr laut wiedergegeben zu werden."
}, {
  "q": "Pan (Panorama)",
  "a": "Ein Poti zum Verstellen der Richtung aus welchem Lautsprecher der Ton kommt (L/Zentriert/R)."
}, {
  "q": "AX",
  "a": "Signalstärke des Tonsignals."
}, {
  "q": "RX",
  "a": "Signalstärke des Funkempfangs."
}, {
  "q": "Intercom",
  "a": "Internes Kommunikationsystem für Kommunikation innerhalb des Technik- und Orga-Teams während Veranstaltungen."
}, {
  "q": "DMX",
  "a": "Das digitales Übertragungs-'Signal' des Lichtpults an die jeweiligen Endgeräte."
}, {
  "q": "Chaser",
  "a": "Ein Chaser ist ein Lauflicht, das voreinprogrammiert wird (im Run-Mode). Man kann es mit den 'Step'-Tasten, automatisch durch ein eingestelltes Tempo oder sogar durch Musik wechseln lassen."
}, {
  "q": "Verfolger/Follow Spot",
  "a": "Großer handbetriebener Scheinwerfer zum Verfolgen von Personen."
}, {
  "q": "Fluid",
  "a": "Flüssigkeit."
}, {
  "q": "Traverse/Truss/Pipe",
  "a": "Ein/e Befestigungsrohr/-vorrichtung aus Metall zu Anbringen von Gegenständen."
}, {
  "q": "Safety",
  "a": "Ein Stahlseil zur Sicherung der angebrachten Scheinwerfer.\n!!!Es ist unumgänglich ein Safety zu benutzen, aufgrund von Sicherheitsvorkehrungen und -vorschriften!!!"
}, {
  "q": "Case",
  "a": "Ein aus Multiplex-Holz gefertigter Koffer. Äußerst stabil."
}, {
  "q": "Rack",
  "a": "Eine Art Case, in dem 19''-Fähige Elemente eingebaut werden"
}];

export let other;

switch (window.location.pathname.split("/")[2]) {
  case "vokabular":
    other = vokabular;
    document.querySelector("h1").innerText = "Fachvokabular";
    break;
  default:
    console.error("Couldn't fetch corresponding data.");
    break;
}