import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter() {
  return (
    <footer className="z-10 mt-40 border-t py-8 ">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 pt-10 md:px-20">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="space-y-8 xl:col-span-2">
            <a href="/">
             
            </a>
            <p className="max-w-xs text-sm">
              Empowering developers with privacy-first A/B testing to create
              high-converting UIs.
            </p>
            <div className="flex items-center space-x-2">
              <a
                href="https://youtube.com/@joshtriedcoding"
                target="_blank"
                rel="noreferrer"
                className="transition-color rounded-md p-2 "
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 461.001 461.001"
                >
                  <g>
                    <path
                      fill="#4b5563"
                      d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728   c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137   C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607   c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
                    ></path>
                  </g>
                </svg>
              </a>
              <div className="h-8 border-l border-gray-200"></div>
              <a
                href="https://twitter.com/joshtriedcoding"
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 248 204"
                  className="h-5 w-5 text-gray-600"
                >
                  <path
                    fill="currentColor"
                    d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Product</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a
                      className="text-sm text-gray-500 hover:text-gray-900"
                      href="/dashboard"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm text-gray-500 hover:text-gray-900"
                      href="/docs/quick-start"
                    >
                      Quick Start
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm text-gray-500 hover:text-gray-900"
                      href="/docs/tracking-clicks"
                    >
                      Clicks
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm text-gray-500 hover:text-gray-900"
                      href="/docs/tracking-conversions"
                    >
                      Conversions
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-600">
                  Compliance
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a
                      className="text-sm text-gray-500 hover:text-gray-900"
                      href="/privacy-commitment"
                    >
                      Privacy commitment
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-600">
                  Community
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a
                      className="text-sm text-gray-500 hover:text-gray-900"
                      href="https://youtube.com/@joshtriedcoding"
                    >
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm text-gray-500 hover:text-gray-900"
                      href="https://discord.gg/4vCRMyzgA5"
                    >
                      Discord
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm text-gray-500 hover:text-gray-900"
                      href="https://twitter.com/joshtriedcoding"
                    >
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-600">Legal</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a
                      className="text-sm text-gray-500 hover:text-gray-900"
                      href="/privacy"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sm text-gray-500 hover:text-gray-900"
                      href="/terms"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-sm leading-5 text-gray-500">splitter.gg</p>
          <ModeToggle/>
        </div>
      </div>
    </footer>
  )
}
