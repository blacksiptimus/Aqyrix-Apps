const Aqyrix = {
  apps: {
    taqweem: {
      apple: "https://apps.apple.com/app/taqweem-aqyrix/id6780969293",
      google: "https://play.google.com/store/apps/details?id=com.aqyrix.taqweem"
    },
    nudge: {
      apple: "https://apps.apple.com/app/nudge-aqyrix/id6821539760",
      google: "https://play.google.com/store/apps/details?id=com.aqyrix.nudge"
    },
    oralis: {
      apple: "https://apps.apple.com/app/oralis-aqyrix/id6822753551",
      google: "https://play.google.com/store/apps/details?id=com.aqyrix.oralis"
    }
  },

  copy: {
    en: {
      title: "Apps",
      pageTitle: "Aqyrix Apps",
      opening: "Opening the store…",
      choose: "Choose a store",
      back: "All apps",
      store: { apple: "App Store", google: "Google Play" },
      taqweem: "Prayer times, Hijri calendar, and Qibla.",
      nudge: "Say a reminder. It rings when it should.",
      oralis: "Turn a how-to conversation into a guide."
    },
    ar: {
      dir: "rtl",
      title: "التطبيقات",
      pageTitle: "تطبيقات عقيركس",
      opening: "جارٍ فتح المتجر…",
      choose: "اختر المتجر",
      back: "كل التطبيقات",
      store: { apple: "آب ستور", google: "جوجل بلاي" },
      taqweem: "أوقات الصلاة، والتقويم الهجري، والقبلة.",
      nudge: "قل التذكير، فيرن في موعده.",
      oralis: "حوّل الشرح إلى دليل تحتفظ به."
    },
    de: {
      title: "Apps",
      pageTitle: "Aqyrix Apps",
      opening: "Der Store wird geöffnet…",
      choose: "Store wählen",
      back: "Alle Apps",
      store: { apple: "App Store", google: "Google Play" },
      taqweem: "Gebetszeiten, Hidschri-Kalender und Qibla.",
      nudge: "Sprich die Erinnerung. Sie klingelt pünktlich.",
      oralis: "Aus einem Gespräch wird eine Anleitung."
    },
    fr: {
      title: "Applications",
      pageTitle: "Applications Aqyrix",
      opening: "Ouverture de la boutique…",
      choose: "Choisir une boutique",
      back: "Toutes les applications",
      store: { apple: "App Store", google: "Google Play" },
      taqweem: "Horaires de prière, calendrier hégirien et qibla.",
      nudge: "Dites le rappel. Il sonne à l’heure.",
      oralis: "Une explication devient un guide."
    },
    es: {
      title: "Aplicaciones",
      pageTitle: "Aplicaciones Aqyrix",
      opening: "Abriendo la tienda…",
      choose: "Elige una tienda",
      back: "Todas las aplicaciones",
      store: { apple: "App Store", google: "Google Play" },
      taqweem: "Horarios de oración, calendario hijri y qibla.",
      nudge: "Di el recordatorio. Suena a su hora.",
      oralis: "Una explicación se convierte en una guía."
    }
  },

  language() {
    const tags = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];
    for (const tag of tags) {
      const base = String(tag).toLowerCase().split("-")[0];
      if (this.copy[base]) return base;
    }
    return "en";
  },

  text() {
    return this.copy[this.language()];
  },

  storeChoice() {
    const ua = navigator.userAgent || "";
    if (/Android/i.test(ua)) return "google";
    const iPad = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    if (/iPhone|iPad|iPod/i.test(ua) || iPad || /Macintosh|Mac OS X/i.test(ua)) return "apple";
    return null;
  },

  openApp(id) {
    const choice = this.storeChoice();
    const app = this.apps[id];
    if (choice && app && app[choice]) location.replace(app[choice]);
  },

  applyLanguage() {
    const text = this.text();
    document.documentElement.lang = this.language();
    document.documentElement.dir = text.dir || "ltr";
    if (document.body && document.body.dataset.page === "home") {
      document.title = text.pageTitle;
    }
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = el.dataset.i18n.split(".").reduce((node, key) => node && node[key], text);
      if (typeof value === "string") el.textContent = value;
    });
    const choice = this.storeChoice();
    document.querySelectorAll("[data-when]").forEach((el) => {
      const show = el.dataset.when === "store" ? Boolean(choice) : !choice;
      el.hidden = !show;
    });
  }
};
