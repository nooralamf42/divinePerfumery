import React from 'react'
import { AddProductsForm, Card, Container, Dialog} from '../../components'
import Button from '../../components/button/Button';
const products = [
    {
      featuredImage: "https://source.unsplash.com/random/800x600",
      name: "Product 1",
      price: 29.99,
      isNew: true,
      discountPrice: 10,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero suscipit labore sapiente similique, tempore quo dolore nesciunt dolor molestias possimus asperiores eligendi fugit, tenetur pariatur dicta aliquid! Veniam, vel natus.'
    },
    {
      featuredImage: "https://source.unsplash.com/random/800x600",
      name: "Product 2",
      price: 49.99,
      isNew: false,
      discountPrice: null,
    },
    {
      featuredImage: "https://source.unsplash.com/random/800x600",
      name: "Product 3",
      price: 19.99,
      isNew: true,
      discountPrice: 5,
    },
    // Add more products as needed
  ];
  
  
function AdminProductsPanel() {
    const openDialog = () =>{
        document.getElementById('addProductDialog').show()
    }
  return (
    <section>
        <Container>
            <Card {...products[0]} admin={true}/>
            <Dialog id="addProductDialog">
                <AddProductsForm/>
            </Dialog>
            <Button name={'Add New Product'} className={'fixed bottom-0 right-0 m-12 bg-white'} onClick={openDialog}/>
        </Container>
    </section>
  )
}

export default AdminProductsPanel