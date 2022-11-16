import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Text, Container } from '@components/ui'
import { useCustomer } from '@framework/customer'
import useWishlist from '@framework/wishlist/use-wishlist'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: {
      pages,
      categories,
    },
  }
}

export default function Offers() {
  return (
    <Container className="pt-4">
      <div className="mb-20">
        <Text variant="pageHeading">Tracked offers page</Text>
      </div>
    </Container>
  )
}

Offers.Layout = Layout
