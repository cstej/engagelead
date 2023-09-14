export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "LeadStacker",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },

  ],
  dashboardMainNav:[
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
    login: "/login",
    signup:"/signup",
    dashboard: "/app/dashboard"
  },
}
