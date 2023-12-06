"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { FaStar } from "react-icons/fa";

const page = ({ params }) => {
  const id = Number(params.id);

  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        const foundProduct = result.products.find(
          (singleProduct) => id === singleProduct.id
        );

        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  // Render loading state while data is being fetched
  if (!product) {
    return <p>Loading...</p>;
  }

  console.log(product.images);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <h1 className="text-3xl text-center font-bold mt-4">Product Details</h1>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.images[0]}
              alt={product.images[0]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[1]}
                alt={product.images[1]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[2]}
                alt={product.images[2]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.images[3]}
              alt={product.images[3]}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className=" text-2xl font-bold mb-4">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-cyan-900 mb-2">{product.description}</p>
              </div>
              <p className=" text-lg font-bold text-cyan-700">Category : {product.category}</p>
              <p className=" text-lg font-bold text-cyan-700">Brand : {product.brand}</p>
              <p className=" text-lg font-bold text-cyan-700">Stock : {product.stock}</p>
            </div>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl tracking-tight text-gray-500 line-through">
                  ${product.price}
                </p>
                <p className="text-3xl font-bold">
                  $
                  {(
                    product.price -
                    (product.price * product.discountPercentage) / 100
                  ).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="flex text-lg items-center text-orange-500 font-bold"><FaStar></FaStar> {product.rating}</p>
              </div>
            </div>
            <button
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
