import React from "react"
import { Metadata } from "next"


import { IntegrationCard } from "../_components/integration-card"
import { FacebookIntregationDialog } from "../_components/facebook-intregation-dialog"


type Props = {}

// either Static metadata
export const metadata: Metadata = {
  title: "Integration",
}

const Integration = (props: Props) => {



  return (
    <div className="flex min-h-screen flex-col">
      <div>
        <p className="pb-8 text-2xl font-semibold tracking-wide">Integration</p>
        {/* <Separator /> */}
      </div>

      <div className=" mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3 ">
        <IntegrationCard
          key={"1"}
          description="Connect your Facebook account now and unlock the power of seamless lead generation."
          href="/facebook"
          title="Facebook"
          icon="facebook"
          connect={<FacebookIntregationDialog/>}
        />
    
      </div>
    </div>
  )
}

export default Integration
