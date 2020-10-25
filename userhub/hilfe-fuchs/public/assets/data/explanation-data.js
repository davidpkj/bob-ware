const audio = [{
    "t": "Das Einschalten der Technik",
    "p": "1. Die Tonsteckdose einschalten.\n2. Das Mischpult einschalten (sofern es sich nicht schon von selbst einschaltet).\n3. Lautsprecher vorne links und rechts einschalten (Schalter auf der Rückseite).\n4. Die Endstufe einschalten (im Rack neben dem Tonpult ganz unten eingebaut).\n"
}, {
    "t": "Der laufende Betrieb",
    "p": "Während der Benutzung der Tontechnik sollte so einiges beachtet werden. Je nach Tonpult ist das Layout anders, aber die grundlegenden Funktionen für den Betrieb sind bei allen gleich.\nZuerst sollte sichergestellt werden, dass der/die zugewiesene/n Master auf '0dB' stehen. Dies bewirkt, dass der Input, den das Pult verarbeiten wird, auch aus den Lautsprechern ausgegeben werden kann.\nAls nächstes guckt man, ob ein Signal auf dem Kanal, auf dem es eingegeben wird ankommt. Hierzu sucht man sich den Kanal, auf dem man sein Gerät angeschlossen hat und gibt ein Signal ein (z.B. durch Abspielen von Musik, spielen eines Instruments oder Sprechen ins Mikrofon). Wenn man nun ein Tonsignal auf diesen Kanal schickt, sollte die 'Signal'-LED leuchten. Ist dies nicht der Fall, sollte an der Vorverstärkung gearbeitet werden (Gain/Lautstärke-Regler am jeweiligen Input-Gerät). Wenn die Signal-LED leuchtet (oder ggf. garnicht leuchtet, die Vorverstärkung ein bisschen runter drehen und dann...) kann vorsichtig der Fader des Kanalzugs nach oben geschoben werden und es sollte nun der Ton zu hören sein, wenn die Signaleingabe nicht gestoppt wurde.\n"
}, {
    "t": "Das Ausschalten der Technik",
    "p": "1. Die Fader der Kanalzüge runterziehen (damit es beim nächsten Einschalten keine Rückkopplung gibt).\n2. Die Lautsprecher ausschalten.\n3. Die Endstufe ausschalten.\n4. --NUR BEIM DIGITALPULT-- Erst die Taste 'Home' drücken und dann auf dem Display 'Shutdown' drücken.\n5. Die Tonsteckdose ausschalten"
}];

const video = [{
    "t": "Das Einschalten der Technik",
    "p": "Zuerst sollte der Laptop an das VGA- oder HDMI-Kabel angeschlossen und eingeschaltet werden. Diese befinden sich auf der rechten Bühnenseite in der Niesche aufgewickelt an der Wand (dort wo auch die Stagebox liegt).\nWenn das Betriebssystem fertig geladen ist, kann der Beamer eingeschaltet werden. Die Fernbedienung sollte in der Technikkammer in dem Schrank gerade vor liegen."
}];

const licht = [{
    "t": "Das Einschalten der Technik",
    "p": "1. Die Lichtsteckdose einschalten.\n2. Die Not-Aus-Schalter außer Kraft setzen.\n3. An dem Lichtpult den 'Grandmaster' und die Master 'A' und 'B' auf 10 stellen.\n4. Den Modus je nach Bedarf einstellen. Siehe Modi unten."
}, {
    "t": "Preset-Modus für den normalen Betrieb (DS, kleine Veranstaltungen)",
    "p": "Um in den Preset-Modus zu gelangen, muss die 'Mode'-Taste gedrückt gehalten werden. Man erkennt den Modus in, dem sich das Pult befindet, an den LEDs neben der Taste.\nWenn sich das Pult im Preset-Modus befindet, muss die '13-24'-LED bei der Taste 'Preset B' leuchten, um alle Scheinwerfer benutzen zu können. Durch das Drücken der Taste kann dies sichergestellt werden.\nJetzt ist es möglich alle Fader zu benutzen, sofern sie belegt sind. Dazu gehören hauptächlich die 'normalen' Scheinwerfer und nicht die LEDs. Die LEDs sind eine Sache für sich und bei denen bedarf es mehr als nur den Fader nach oben zu schieben. Deshalb haben die LEDs auch einen Bereich für sich."
}, {
    "t": "Run-Modus für den Show-Betrieb (Musical und Theater)",
    "p": "--Auch für Klausurersatzleistungen in DS ist der Preset-Modus ausreichend!--\n "
}, {
    "t": "Die LEDs",
    "p": "Die LEDs liegen nicht immer auf den gleichen DMX-Kanälen und Fadern. Am besten bei Bedarf nach einem Zettel in der Nähe des Lichtpultes oder in der Technikkammer suchen. Wenn keiner gefunden wird, ausprobieren oder einen Techniker/Sachkundigen fragen.\nBei den Fadern sieht es dann wie folgt aus (alle Angaben außer der Funktion sind abhängig vom Farbmischmodus):\n  Funktion - Dieser Fader bestimmt in welchem Modus die LEDs laufen. Um den Farbmischmodus zu benutzten, muss sich der Fader auf auf ca. 1,8 befinden.\n  Dim - Dieser Fader bestimmt im Farbmischmodus die Gesamt-helligkeit der LED.\n  Rot - Dieser Fader bestimmt im Farbmischmodus die Helligkeit der Farbe rot.\n  Grün - Dieser Fader bestimmt im Farbmischmodus die Helligkeit der Farbe grün.\n  Blau - Dieser Fader bestimmt im Farbmischmodus die Helligkeit der Farbe blau."
}, {
    "t": "Die Nebelmaschine",
    "p": "Die Nebelmaschine darf (Stand: 22.01.2020) offiziell nicht benutzt werden. Bei Fragen, bitte an Techniker und Lehrkräfte wenden."
}, {
    "t": "Das Ausschalten der Technik",
    "p": "1. Alle Fader auf 0 stellen.\n2. Alle Master auf 0 stellen.\n3. Einen Not-Aus-Schalter reindrücken.\n4. Lichtsteckdose ausschalten."
}];

const rigging = [{
    "t": "Lorem",
    "p": "Lorem ipsum dolor"
}];

export let explanation;

switch (window.location.pathname.split("/")[2]) {
    case "audio":
        explanation = audio;
        document.querySelector("h1").innerText = "Audio - Erklärung";
        break;
    case "video":
        explanation = video;
        document.querySelector("h1").innerText = "Video - Erklärung";
        break;
    case "licht":
        explanation = licht;
        document.querySelector("h1").innerText = "Licht - Erklärung";
        break;
    case "rigging":
        explanation = rigging;
        document.querySelector("h1").innerText = "Rigging - Erklärung";
        break;
    default:
        console.error("Couldn't fetch corresponding data.");
        break;
}