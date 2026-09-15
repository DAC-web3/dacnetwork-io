(function () {
  const I = {
    kicker: { en: "UTILITY TOKEN · SOLANA · TOKEN-2022", ro: "TOKEN UTILITAR · SOLANA · TOKEN-2022" },
    h1a: { en: "Value is", ro: "Valoarea se" },
    h1b: { en: "proven.", ro: "dovedește." },
    h1c: { en: "Not promised.", ro: "Nu se promite." },
    lead: {
      en: "DACnetwork is a Web3 ecosystem on Solana where real human activity, private communication, digital creation and physical infrastructure become verified utility — powered by $DAC.",
      ro: "DACnetwork este un ecosistem Web3 pe Solana unde activitatea umană reală, comunicarea privată, creația digitală și infrastructura fizică devin utilitate verificată — cu $DAC."
    },
    "nav.eco": { en: "Ecosystem", ro: "Ecosistem" },
    "nav.road": { en: "Roadmap", ro: "Roadmap" },
    "nav.com": { en: "Community", ro: "Comunitate" },
    eco: { en: "Explore the stack", ro: "Explorează ecosistemul" },
    wp: { en: "Read Whitepaper v2.0", ro: "Citește Whitepaper v2.0" },
    wp2: { en: "Whitepaper", ro: "Whitepaper" },
    dacx: { en: "Get DACx", ro: "Descarcă DACx" },
    inst: { en: "INSTRUMENT", ro: "INSTRUMENT" },
    tos: { en: "Token of Society", ro: "Token al Societății" },
    supply: { en: "Total supply", ro: "Supply total" },
    supplyv: { en: "3,000,000,000 · fixed", ro: "3.000.000.000 · fix" },
    burn: { en: "Auto-burn", ro: "Auto-burn" },
    net: { en: "Network", ro: "Rețea" },
    std: { en: "Standard", ro: "Standard" },
    copy: { en: "Copy", ro: "Copiază" },
    copied: { en: "Copied", ro: "Copiat" },
    mint: { en: "Mint revoked", ro: "Mint revocat" },
    freeze: { en: "Freeze revoked", ro: "Freeze revocat" },
    sale: { en: "No public sale", ro: "Fără vânzare publică" },
    d1: { en: "Private messenger. xID. Android beta 1.5.7 + OTA. Wallet Solana Devnet. Not E2EE. Not mainnet $DAC.", ro: "Messenger privat. xID. Android beta 1.5.7 + OTA. Wallet Solana Devnet. Nu e E2EE. Nu e $DAC mainnet." },
    d2: { en: "Proof of Activity. API live on Devnet. 1 $DAC / 10 km. Max 5 / user / day. No public APK. Not mainnet rewards.", ro: "Proof of Activity. API live pe Devnet. 1 $DAC / 10 km. Max 5 / user / zi. Fără APK public. Nu sunt recompense mainnet." },
    disc: { en: "$DAC is a utility token, not an investment.", ro: "$DAC este un token utilitar, nu o investiție." },
    assoc: { en: "Asociația DACnetwork Web3 — registration in progress (OG 26/2000). Not yet in the register.", ro: "Asociația DACnetwork Web3 — înregistrare în curs (OG 26/2000). Nu e încă în registru." },
    mn: { en: "Mainnet mint", ro: "Mint Mainnet" },
    dn: { en: "Devnet mint", ro: "Mint Devnet" },
    apk: { en: "Download APK", ro: "Descarcă APK" },
    d3: { en: "Digital society. Not an escape metaverse.", ro: "Societate digitală. Nu un metaverse de evadare." },
    d4: { en: "Edge infrastructure. Privacy by architecture.", ro: "Infrastructură edge. Privacy by architecture." },
    live: { en: "LIVE · ANDROID 1.5.7", ro: "LIVE · ANDROID 1.5.7" },
    dacxstat: { en: "BETA · WALLET DEVNET", ro: "BETA · WALLET DEVNET" },
    rxstat: { en: "DEVNET · IN DEVELOPMENT", ro: "DEVNET · ÎN DEZVOLTARE" },
    plan: { en: "PLANNED", ro: "PLANIFICAT" },
    rd: { en: "R&D", ro: "C&D" }
  };
  const q = new URLSearchParams(location.search).get("lang");
  const stored = localStorage.getItem("dac-lang");
  let lang =
    q === "ro" || q === "en"
      ? q
      : stored === "ro" || stored === "en"
        ? stored
        : (navigator.language || "").toLowerCase().startsWith("ro")
          ? "ro"
          : "en";
  function t(k) {
    return (I[k] && I[k][lang]) || k;
  }
  function apply() {
    document.querySelectorAll("#dac-top [data-t]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-t"));
    });
    document.querySelectorAll("#dac-top .lang button").forEach((b) => b.classList.toggle("on", b.dataset.lang === lang));
  }
  window.dacSetLang = function (l) {
    localStorage.setItem("dac-lang", l);
    const u = new URL(location.href);
    u.searchParams.set("lang", l);
    location.href = u.toString();
  };
  const mob = document.getElementById("dac-mob");
  function closeMob() {
    mob?.classList.remove("on");
    document.body.classList.remove("dac-menu-on");
  }
  document.getElementById("dacMenu")?.addEventListener("click", () => {
    const open = mob?.classList.toggle("on");
    document.body.classList.toggle("dac-menu-on", !!open);
  });
  document.querySelectorAll("#dac-mob a").forEach((a) => a.addEventListener("click", closeMob));
  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 960) closeMob();
    },
    { passive: true }
  );
  const copyBtn = document.getElementById("dacCopy");
  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("4m9XHiFaZcoUiMxaJH9DbxSXJXuQuXASw3q35hZPjghb");
      copyBtn.textContent = t("copied");
      setTimeout(() => (copyBtn.textContent = t("copy")), 1400);
    } catch {}
  });
  apply();
})();
