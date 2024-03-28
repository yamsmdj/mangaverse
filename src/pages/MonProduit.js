import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../components/product";
import { useParams } from "react-router-dom";

const MonProduit = () => {
  const [products, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products`)
      .then((res) => {
        setProduct(res.data);
        // console.log("all :" , res.data);
        // setProduits(res.data["hydra:member"]);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des produits : ",
          error
        );
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.oeuvres?.id === parseInt(id)
    );
    setFilteredProducts(filtered);
    // console.log("filtre : " , filtered);
    // console.log("all : ");
  }, [id, products]);

  const selectedProduct = filteredProducts.find(
    (product) => product.oeuvres?.id === parseInt(id)
  );
  console.log("ayaaa", selectedProduct);
  return (
    <section className="bg-bleuDark text-white">
      <div className="flex w-1/2 m-auto ">
        <div className="">
          <img src={`/img/manga/${selectedProduct?.oeuvres?.name.replace(/\s+/g,"")}/${selectedProduct?.picture}`} alt="One piece" className=" w-44"/>
        </div>
        <div className="">
          <p>
            {selectedProduct ? selectedProduct.oeuvres?.name: "Nom du produit non trouvé"}
          </p>
          <p>
            {selectedProduct ? selectedProduct.type?.name: "type du produit non trouvé"}
          </p>
          <p>
            En stock :{selectedProduct ? selectedProduct.quantiter: "quantité du produit non trouvé"}
          </p>
        </div>
      </div>
      <div className=" flex  items-center m-auto gap-2 w-1/2 py-5">
       <p> Prix :{selectedProduct ? selectedProduct.quantiter: "quantité du produit non trouvé"}</p>
       <button className=" rounded px-3 text-black bg-orange-200">Ajouter au panier</button>
       </div>

        <div className="w-1/2 m-auto border">
        <p>Introduction de la serie : 
        <p>{selectedProduct ? selectedProduct?.oeuvres?.text: "description du produit non trouvé"}</p></p>
        </div>
      {/* <pre>{JSON.stringify(selectedProduct, null, 2)}</pre> */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-7">
        {filteredProducts.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </section>
  );
};

export default MonProduit;
