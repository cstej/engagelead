export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "engagelead",
 
  mainNav: [
    {
      title: "Features",
      href: "/features",
      disabled: true,
      
    },
    {
      title: "Integrations",
      href: "/integrations",
    },

    {
      title: "Pricing",
      href: "/pricing",
    },

    {
      title: "Contact",
      href: "/contact",
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
