import { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ArtItems = () => {
  const [arts, setArts] = useState([]);

  useEffect(() => {
    fetch("https://pix-arts-server.vercel.app/artItems")
      .then((res) => res.json())
      .then((data) => {
        setArts(data);
      });
  }, []);

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating); // Round rating to nearest integer
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= filledStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="md:container rounded-2xl md:mt-20 mx-4 bg-[#F8F8F8] py-5 lg:px-6 md:mx-auto">
      <h1 className="md:text-4xl text-3xl font-bold text-[#333333] text-center my-6">
        Art Items
      </h1>
      <p className="text-center text-gray-600 md:w-1/2 md:mx-auto mb-12">
        Explore our collection of beautiful art pieces. Each item is crafted
        with care and passion. Browse through our gallery to find the perfect
        piece to add to your collection.
      </p>
      <ul className="grid lg:grid-cols-3 md:grid-cols-2  gap-6 grid-cols-1">
        {arts.map((art) => (
          <li key={art._id}>
            <div className="card card-compact relative bg-base-100 md:w-96 shadow-xl">
              <span
                className={`absolute -right-2 h-7 border-none font-normal text-white -top-2 badge ${
                  art.stockStatus === "inStock"
                    ? "bg-green-500"
                    : art.stockStatus === "madeToOrder"
                    ? "bg-yellow-500"
                    : art.stockStatus === "outOfStock"
                    ? "bg-orange-600"
                    : "badge-secondary"
                }`}
              >
                {art.stockStatus === "inStock"
                  ? "In Stock"
                  : art.stockStatus === "madeToOrder"
                  ? "Made to Order"
                  : art.stockStatus === "outOfStock"
                  ? "Out of Stock"
                  : null}
              </span>
              <figure>
                <img
                  className="w-full h-64 rounded-t-xl"
                  src={art.photo}
                  alt="Art"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-center mx-auto my-2 text-[#3749bb]">
                  {art.itemName}
                </h2>
                <div className="flex items-center">
                  <p>
                    <span className="font-bold mr-1">Category:</span>{" "}
                    {art.selectedSubCategory?.label}
                  </p>
                  <p className="text-end">
                    <span className="font-bold mr-1">Price:</span> {art.price}
                    <span className="">৳</span>
                  </p>
                </div>
                <p className="font-bold flex items-center">
                  <span className="mr-2"> Ratings:</span>
                  <span className="text-xl flex">
                    {renderStars(art.rating)}{" "}
                  </span>
                </p>
                <div className="card-actions justify-end">
                  <Link to={`/artDetails/${art._id}`}>
                    {" "}
                    <button className="btn rounded-full bg-yellow-500 hover:bg-yellow-400 text-amber-800">
                      Detals
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <Link to="/allArts">
          <button className="btn w-full my-8 bg-[#333333] font-normal text-white hover:bg-[#414040]">
            All Arts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArtItems;
