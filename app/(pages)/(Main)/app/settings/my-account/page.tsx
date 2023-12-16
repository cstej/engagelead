import AccountSecurity from '@/components/settings/my-account/form/account-security'
import DeleteAccount from '@/components/settings/my-account/form/delete-account'
import EditAccountProfile from '@/components/settings/my-account/form/edit-account-profile'
import React from 'react'

type Props = {}

const MyAccount = (props: Props) => {
  return (
    <div className="my-6 flex flex-col gap-4 px-4">
      <EditAccountProfile/>
      <AccountSecurity/>
      <DeleteAccount/>
  </div>
  )
}

export default MyAccount