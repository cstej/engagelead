import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Balancer from 'react-wrap-balancer'
import { ArrowRight, Bot } from "lucide-react"

export default function IndexPage() {
  return (
    <>
      <div className="relative isolate flex-1">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>

      <section className="mx-auto mb-12 mt-20 flex w-full max-w-screen-xl flex-col items-center justify-center gap-5 px-2.5 text-center sm:mt-40 md:px-20">
        <div className="flex  flex-col items-center gap-4">
          <h1 className=" text-3xl font-extrabold sm:text-3xl md:text-5xl lg:text-6xl">
          <Balancer>
          Close More Deals with Automated Lead Management
          </Balancer>
          </h1>

          <p className="text-muted-foreground md:text-lg ">
            <Balancer>

            EngageLead is the all-in-one lead management solution that helps businesses of all sizes automate their lead generation, nurture, and conversion process, so they can close more deals, faster
            </Balancer>
          
          
          </p>
        </div>
        <div className="flex gap-4">
          <Link
          
            href={siteConfig.links.docs}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({
              size:"lg",
              variant: "default"
             
            }), " rounded-full bg-violet-600 text-base shadow-xl dark:bg-primary")}
          >
            Try<Bot size={24} className="mx-2 inline-block" />for free <ArrowRight size={20} className="ml-2 inline-block" />
          </Link>
         
        </div>
      </section>
    </>
  )
}
