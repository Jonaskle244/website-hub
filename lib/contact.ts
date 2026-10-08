export const CONTACT_EMAIL = "info@codemantix.com";

// Gleiche Nummer wie im Google-Unternehmensprofil (Angaben dort und hier sollen übereinstimmen).
export const PHONE_DISPLAY = "01514 1246440";
export const PHONE_HREF = "tel:+4915141246440";

export const PROJECT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Projektanfrage · Codemantix")}&body=${encodeURIComponent(
  "Hallo Jonas,\n\nmeine Projektidee oder bestehende Website:\n\nDas möchte ich umsetzen oder verbessern:\n\nMein gewünschter Zeitraum:\n\nViele Grüße\n",
)}`;

// Bestehender zweiter Kontaktweg desselben Betreibers, klar als extern benannt.
export const CONTACT_FORM = "https://kinokanon.codemantix.com/de/kontakt/";

export const CONTACT_FORM_EN = "https://kinokanon.codemantix.com/en/kontakt/";

export const PROJECT_MAILTO_EN = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Project enquiry · Codemantix")}&body=${encodeURIComponent(
  "Hi Jonas,\n\nMy project idea or current website:\n\nWhat I would like to build or improve:\n\nMy preferred timeframe:\n\nBest regards\n",
)}`;
