"use client"

import { useTranslation } from "react-i18next"
import MenuCTA from "@/components/common/menu-cta"
import "@/i18n"

export default function BrowseMenuCTA() {
  const { t } = useTranslation()

  return (
    <MenuCTA
      overline={t("menuCta.overline")}
      title={t("menuCta.title")}
      description={t("menuCta.desc")}
      buttonText={t("menuCta.browseFull")}
      buttonHref="#menu"
    />
  )
}
