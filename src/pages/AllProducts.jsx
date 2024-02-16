import React from 'react'
import { Container, Products } from '../components'
import { useSelector } from 'react-redux'

function AllProducts() {
  const products = useSelector(state=>state.allProducts)
  return (
    <section>
      <Container>
        <Products products={products} />
      </Container>
    </section>
  )
}

export default AllProducts