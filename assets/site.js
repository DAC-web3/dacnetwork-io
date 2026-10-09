(function () {
  const I = {
    nav1: { en: "Token", ro: "Token" },
    nav2: { en: "DACx", ro: "DACx" },
    nav3: { en: "Ecosystem", ro: "Ecosistem" },
    wp: { en: "Whitepaper", ro: "Whitepaper" },
    apk: { en: "Download DACx", ro: "Descarcă DACx" },
    kicker: { en: "Solana · Token-2022 · Utility", ro: "Solana · Token-2022 · Utilitar" },
    h1a: { en: "Human", ro: "Activitate" },
    h1b: { en: "activity.", ro: "umană." },
    lead: {
      en: "DACnetwork is a Web3 ecosystem on Solana. Real activity, private communication and infrastructure, coordinated by the $DAC utility token. Not an investment.",
      ro: "DACnetwork este un ecosistem Web3 pe Solana. Activitate reală, comunicare privată și infrastructură, coordonate de tokenul utilitar $DAC. Nu este o investiție."
    },
    live: { en: "Live · Android 1.5.10", ro: "Live · Android 1.5.10" },
    dacxTitle: { en: "Private messenger.", ro: "Messenger privat." },
    dacxBody: {
      en: "xID. Messages disappear 3 minutes after they are read. Solana Devnet wallet. Not end-to-end encrypted. Not mainnet $DAC.",
      ro: "xID. Mesajele dispar la 3 minute după citire. Wallet Solana Devnet. Nu este E2EE. Nu este $DAC mainnet."
    },
    dev: { en: "Devnet · In development", ro: "Devnet · În dezvoltare" },
    rutaBody: {
      en: "Proof of Activity. API live on Devnet. 1 $DAC / 10 km. Max 5 / user / day. No public APK. Not mainnet rewards.",
      ro: "Proof of Activity. API live pe Devnet. 1 $DAC / 10 km. Max 5 / user / zi. Fără APK public. Nu sunt recompense mainnet."
    },
    plan: { en: "Planned", ro: "Planificat" },
    metaBody: { en: "Digital society. Not an escape metaverse.", ro: "Societate digitală. Nu un metaverse de evadare." },
    rd: { en: "R&D", ro: "C&D" },
    smartBody: { en: "Edge infrastructure. Privacy by architecture.", ro: "Infrastructură edge. Privacy by architecture." },
    supply: { en: "Total supply", ro: "Supply total" },
    burn: { en: "Auto-burn", ro: "Auto-burn" },
    net: { en: "Network", ro: "Rețea" },
    std: { en: "Standard", ro: "Standard" },
    copy: { en: "Copy mint", ro: "Copiază mint" },
    copied: { en: "Copied", ro: "Copiat" },
    mint: { en: "Mint revoked", ro: "Mint revocat" },
    freeze: { en: "Freeze revoked", ro: "Freeze revocat" },
    sale: { en: "No public sale", ro: "Fără vânzare publică" },
    mainnet: { en: "Mainnet mint", ro: "Mint mainnet" },
    devnet: { en: "Devnet mint", ro: "Mint Devnet" },
    sol: { en: "Solscan", ro: "Solscan" },
    note: {
      en: "Asociația DACnetwork Web3 — registration in progress (OG 26/2000). Not yet in the register. $DAC is a utility token, not an investment.",
      ro: "Asociația DACnetwork Web3 — înregistrare în curs (OG 26/2000). Nu e încă în registru. $DAC este un token utilitar, nu o investiție."
    },
    tos: { en: "Token of Society", ro: "Token al Societății" }
  };
  const q = new URLSearchParams(location.search).get("lang");
  const stored = localStorage.getItem("dac-lang");
  let lang = q === "ro" || q === "en" ? q : stored === "ro" || stored === "en" ? stored : (navigator.language || "").toLowerCase().startsWith("ro") ? "ro" : "en";
  const t = (k) => (I[k] && I[k][lang]) || k;
  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = t(el.getAttribute("data-t")); });
    document.querySelectorAll("[data-en]").forEach((el) => {
      el.textContent = el.getAttribute(lang === "ro" ? "data-ro" : "data-en");
    });
    document.querySelectorAll(".lang button").forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    const menu = document.getElementById("menuBtn");
    if (menu) menu.setAttribute("aria-label", lang === "ro" ? "Meniu" : "Menu");
  }
  window.dacSetLang = function (l) {
    lang = l;
    localStorage.setItem("dac-lang", l);
    const u = new URL(location.href);
    u.searchParams.set("lang", l);
    u.hash = "";
    history.replaceState(null, "", u.pathname + u.search);
    apply();
  };
  document.getElementById("copyMint")?.addEventListener("click", async () => {
    const btn = document.getElementById("copyMint");
    try {
      await navigator.clipboard.writeText("4m9XHiFaZcoUiMxaJH9DbxSXJXuQuXASw3q35hZPjghb");
      btn.textContent = t("copied");
      setTimeout(() => { btn.textContent = t("copy"); }, 1400);
    } catch {}
  });
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  menuBtn?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("on");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    navLinks.classList.remove("on");
    menuBtn?.setAttribute("aria-expanded", "false");
  }));
  apply();
})();
