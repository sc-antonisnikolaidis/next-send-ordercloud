import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  children?: any
}

const Page: FC<Props> = ({ children }) => {
  const { user } = useAuth0()

  useEffect(() => {
    if (user?.email) {
      // @ts-ignore
      window.mootrack('identify', user.email)
      console.log('*** Moosend just identified user')
    }
  }, [user])

  return <>{children}</>
}

export default Page
