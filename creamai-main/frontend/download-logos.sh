#!/bin/bash

# ============================================================
#  TheCreamAI – Téléchargement automatique des logos
#  Tous les outils : VPN + IA + Hébergement web
# ============================================================
#  Usage :
#    cd thecreamai/frontend
#    bash download-logos.sh
# ============================================================

DEST="./public/partners"
mkdir -p "$DEST"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   TheCreamAI – Téléchargement des logos      ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "📁 Dossier cible : $DEST"
echo "-------------------------------------------"

declare -A LOGOS=(

  # ── VPN ──────────────────────────────────────
  ["nordvpn"]="nordvpn.com"
  ["surfshark"]="surfshark.com"
  ["proton-vpn"]="protonvpn.com"
  ["expressvpn"]="expressvpn.com"
  ["cyberghost-vpn"]="cyberghostvpn.com"
  ["ipvanish"]="ipvanish.com"
  ["total-vpn"]="totalvpn.com"
  ["norton-vpn"]="norton.com"
  ["bitdefender-vpn"]="bitdefender.com"
  ["kaspersky-vpn"]="kaspersky.com"
  ["mullvad-vpn"]="mullvad.net"
  ["purevpn"]="purevpn.com"
  ["hideme"]="hide.me"
  ["privadovpn"]="privadovpn.com"
  ["hma-vpn"]="hidemyass.com"

  # ── Intelligence artificielle ─────────────────
  ["emergent"]="emergent.sh"
  ["clickup"]="clickup.com"

  # ── Hébergement web ───────────────────────────
  ["hostinger"]="hostinger.com"
  ["o2switch"]="o2switch.fr"
  ["ovhcloud"]="ovhcloud.com"
  ["siteground"]="siteground.com"
  ["planethoster"]="planethoster.com"
  ["kinsta"]="kinsta.com"
  ["lws"]="lws.fr"
  ["ionos"]="ionos.fr"
  ["bluehost"]="bluehost.com"
  ["hostarmada"]="hostarmada.com"

)

OK=0
SKIP=0
FAIL=0
FAIL_LIST=()

for slug in "${!LOGOS[@]}"; do
  DOMAIN="${LOGOS[$slug]}"
  DEST_FILE="$DEST/$slug.png"
  URL="https://logo.clearbit.com/$DOMAIN"

  if [ -f "$DEST_FILE" ]; then
    echo "⏭  $slug.png  (déjà présent)"
    ((SKIP++))
    continue
  fi

  HTTP_CODE=$(curl -s -o "$DEST_FILE" -w "%{http_code}" \
    -L --max-time 10 \
    -A "Mozilla/5.0" \
    "$URL")

  if [ "$HTTP_CODE" = "200" ] && [ -s "$DEST_FILE" ]; then
    echo "✅  $slug.png"
    ((OK++))
  else
    rm -f "$DEST_FILE"
    echo "❌  $slug.png  (HTTP $HTTP_CODE)"
    FAIL_LIST+=("$slug  →  https://logo.clearbit.com/$DOMAIN")
    ((FAIL++))
  fi

done

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║                   BILAN                     ║"
echo "╠══════════════════════════════════════════════╣"
printf  "║  ✅ Téléchargés   : %-24s ║\n" "$OK"
printf  "║  ⏭  Déjà présents : %-24s ║\n" "$SKIP"
printf  "║  ❌ Échoués       : %-24s ║\n" "$FAIL"
echo "╚══════════════════════════════════════════════╝"

if [ ${#FAIL_LIST[@]} -gt 0 ]; then
  echo ""
  echo "💡 Logos à récupérer manuellement :"
  echo "   → Renommez-les en [slug].png"
  echo "   → Placez-les dans : public/partners/"
  echo ""
  for item in "${FAIL_LIST[@]}"; do
    echo "   • $item"
  done
  echo ""
  echo "   Pages presse officielles :"
  echo "   NordVPN      → https://nordvpn.com/fr/press/"
  echo "   Surfshark    → https://surfshark.com/press"
  echo "   ExpressVPN   → https://www.expressvpn.com/press"
  echo "   Hostinger    → https://www.hostinger.fr/press"
  echo "   OVHcloud     → https://corporate.ovhcloud.com/fr/newsroom/"
  echo "   Kinsta       → https://kinsta.com/press/"
  echo "   SiteGround   → https://www.siteground.com/press-center/"
fi

echo ""
echo "🎉 Terminé ! Logos dans : $DEST"
echo ""