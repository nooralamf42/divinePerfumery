import React from "react";
import { AddProductsForm, Container, Dialog, Products } from "../../components";
import Button from "../../components/button/Button";
import { useSelector } from "react-redux";

function AdminProductsPanel() {
  const openDialog = () => {
    document.getElementById("addProductDialog").show();
  };

  const products = useSelector((state) => state.allProducts);

  return (
    <section>
      <Container>
        <Products products={products} admin={true} />
        <Dialog id="addProductDialog">
          <AddProductsForm />
        </Dialog>
        <Button
          name={"Add New Product"}
          className={"fixed bottom-0 right-0 m-12"}
          onClick={openDialog}
        />
      </Container>
    </section>
  );
}

export default AdminProductsPanel;
