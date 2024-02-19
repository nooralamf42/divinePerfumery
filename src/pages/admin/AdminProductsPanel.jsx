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
          name={"+"}
          className={"fixed px-2 py-2 bottom-12 left-0 m-5"}
          onClick={openDialog}
        />
      </Container>
    </section>
  );
}

export default AdminProductsPanel;
