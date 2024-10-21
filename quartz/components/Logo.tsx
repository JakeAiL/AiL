import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { FullSlug, joinSegments, pathToRoot } from "../util/path"

function Logo({ cfg, fileData, externalResources, displayClass }: QuartzComponentProps) {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const path = url.pathname as FullSlug

  const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)

  const logoPath = joinSegments(baseDir, "content/z-attachment/logo.png")

  return (
    <div class={classNames(displayClass, "logo logo-container")}>
      <img rel="icon" src={logoPath} class="logo logo-image" />
    </div>
  )
}

export default (() => Logo) satisfies QuartzComponentConstructor
