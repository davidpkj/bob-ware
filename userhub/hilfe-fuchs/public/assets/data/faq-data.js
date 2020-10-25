const audio = [{
    "q": "Es kommt kein Ton",
    "a": "- Den Signalweg verfolgen und gucken ob alle Stecker drinnen stecken\n- Den Gain (Vorverstärkung) höher drehen\n- Lautstärke des Kanals überprüfen und gegebenfalls erhöhen\n- Lautstärke des Masters überprüfen und gegebenfalls erhöhen\n- Gucken ob die Lautsprecher eingeschaltet sind\n- Überprüfen ob das Mischpult eingeschaltet ist\n- Sichergehen, dass das Kabel nicht defekt ist (testen und gegebenenfalls austauschen)\n- Nachschauen ob das Mikrofon in Ordnung ist (austauschen um zu überprüfen)"
  },
  {
    "q": "Ein Funkmikrofon funktioniert nicht",
    "a": "- Nachgucken, ob die Frequeny am Mikrofon und am Empfänger gleich sind\n- Überprüfen ob die Batterien geladen sind\n- Bei den Beltpacks gegebenenfalls das Mikrofon tauschen\n- Am Empfänger anhand der RF-Skala überprüfen, ob ein Funksignal am Empfänger ankommt\n-> wenn ja, bei 'Es kommt kein Ton' weitere Schritte versuchen"
  },
  {
    "q": "Es pfeift/brummt laut (Rückkopplung)",
    "a": "- Die Lautstärke des Kanals mit der Rückkopplung verringern\n- Zur Not den die Gesamtlautstärke mittels des Masters leiser machen"
  }
];

const video = [{
    "q": "Der Beamer findet die Quelle nicht",
    "a": "- Erst den Laptop einschalten, dann den Beamer\n- Wenn möglich zwischen HDMI und VGA wechseln"
  },
  {
    "q": "Wo kann ich meinen Laptop anschließen",
    "a": "- Die Video-Kabel befinden sich auf der rechten Bühnenseite, hinter der schwarzen Wand"
  },
  {
    "q": "Wie kriege ich den Beamer an",
    "a": "- Die Fernbedienung liegt in der Technik-Kammer im Schrank gerade vor"
  }
];

const licht = [{
    "q": "Das Licht geht nicht an",
    "a": "- Der Not-Aus-Schalter muss außer Kraft gesetzt sein (wenn Lampen glimmen-ja, wenn nicht-nein)\n- Das Lichtpult muss eingeschaltet sein\n- Der Grand-Master sollte auf 100% stehen\n- Die Master A und Master B sollten ebenfalls auf 100%?\n- Die B.O. -Taste darf nicht gedrückt sein\n- Der Fader der Lampe sollte die gewünschte %-zahl betragen\n- Das DMX Kabel muss in der Stagebox in der Buchse des Kanals 20 stecken, ebenso sollte vom Lichtpult aus ein Kabel zum Stecker 20 des Multicores führen"
  },
  {
    "q": "Eine Lampe leuchtet nicht",
    "a": "- Alle Sicherungen der Lampen sollten drinnen sein (Siehe grauer Schrank im kleinen Band-Raum)\n- Der Netzstecker der Lampe muss eingesteckt sein (zur Not das Kabel verfolgen)\n- Gegebenenfalls ist auch Leuchtmittel durchgebrannt? (was jetzt? -> siehe rigging)"
  },
  {
    "q": "Das Lichtpult geht nicht",
    "a": "- Die Licht-Steckdose muss eingeschaltet werden\n- Das Netzteil des Pultes muss eingesteckt sein"
  },
  {
    "q": "Ich möchte eigene/geliehene Geräte mit einbinden",
    "a": "- Wenn nur wenig Ahnung von der Technik vorhanden ist, einen Techniker oder Sachkundigen um Hilfe bitten\n- Bei Scheinwerfer mit ausschließlich dimmbaren Leuchtmitteln nur die Licht-Steckdosen benutzen\n- Bei sonstigen Geräten, DMX-Kabel (sofern DMX-Fähig) und Stromkabel verlegen und bei Anbringen and gegenständen, jetzt den Rigging-Teil aufrufen"
  }
];

const rigging = [{
    "q": "Ich möchte einen Scheinwerfer/sonstiges ausrichten (nicht umhängen)",
    "a": "!!!JEGLICHE ARBEITEN MINDESTENS ZU ZWEIT ERLEDIGEN!!!\n- die große Leiter nehmen, eine Person die Leiter halten lassen, und dann vorsichtig die Scheinwerfer ausrichten"
  },
  {
    "q": "Ich möchte etwas anbauen/abbauen/umhängen",
    "a": "!!!JEGLICHE ARBEITEN MINDESTENS ZU ZWEIT ERLEDIGEN!!!\n!!!JEDE ÄNDERUNG IST DER ZUSTÄNDIGEN LEHRKRAFT ODER EINEM TECHNIKER UNUMGEHEND ZU BERICHTEN!!!\n!!!BEI UNWISSEN TECHNIKER/SACHKUNDIGEN UM HILFE BITTEN!!!\n!!!ACHTUNG: Nach Anbau jeglicher Gegenstände die nicht auf dem Boden stehen, oder auf und über Kopfhöhe hängen, mit einem Safety (Drahtseil mit Verbindungselement) zusaätzlich sichern!!!\n- die große Leiter nehmen, eine Person die Leiter halten lassen, und dann vorsichtig die zu verichtenden Arbeiten beginnen\n- das Gewicht der Geräte nicht vernachlässigen!\n- am besten mit einem Seil die geräte von der zweiten Person hochziehen/ablassen/sichern lassen"
    // kommt dieser Teil nicht eher in "Erklärungen"?
  }
];

export let faq;

switch (window.location.pathname.split("/")[2]) {
  case "audio":
    faq = audio;
    document.querySelector("h1").innerText = "Audio - FAQ";
    break;
  case "video":
    faq = video;
    document.querySelector("h1").innerText = "Video - FAQ";
    break;
  case "licht":
    faq = licht;
    document.querySelector("h1").innerText = "Licht - FAQ";
    break;
  case "rigging":
    faq = rigging;
    document.querySelector("h1").innerText = "Rigging - FAQ";
    break;
  default:
    console.error("Couldn't fetch corresponding data.");
    break;
}

// Ausformulieren, wie bei einem Sachtext.