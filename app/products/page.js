"use client";

import Link from "next/link";
import { useEffect, useState, useClient } from "react";
import { FaStar } from "react-icons/fa";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      {data && (
        <div>
          <h1>Product List</h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 p-4 gap-2 lg:gap-8 lg:p-28">
            {data.map((product) => (
              <div
                className="p-4 rounded-xl border-2 border-gray-400"
                key={product.id}
              >
                
                  <img
                    className="h-48 w-48  rounded-lg"
                    src={product.thumbnail}
                    alt=""
                  />
                <h2 className="mt-4 text-xl font-bold text-cyan-500">
                  {product.title}
                </h2>
                <div>
                  <div className="flex items-center justify-between mt-2 mb-2">
                    <div>
                      <p className="text-lg text-gray-500 font-bold line-through">
                        ${product.price}
                      </p>
                      <p className="text-lg font-bold">
                        $
                        {(
                          product.price -
                          (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </p>
                    </div>
                    <p className="flex items-center text-orange-800 text-lg">
                      <FaStar></FaStar> {product.rating}
                    </p>
                  </div>
                </div>
                <Link
                  data={product}
                  className="flex justify-center mt-4 items-center"
                  href={`/products/${product.id}`}
                  passHref
                >
                  <button className="bg-red-500 px-4 py-1 rounded-xl text-white text-xl justify-center">
                    Show Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
