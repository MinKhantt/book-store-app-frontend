import React from "react";
import { useParams } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useFetchSingleBookQuery } from "../../redux/features/books/booksApi";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchSingleBookQuery(id);

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading)
    return (
      <div className="min-h-screen grid place-items-center">Loading...</div>
    );
  if (isError)
    return <div className="min-h-screen grid place-items-center">Error</div>;

  return (
    <div className="min-h-screen bg-[#f8f9ff] py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg p-6">
          {/* Left Side - Image with fixed dimensions */}
          <div className="md:w-1/3">
            <div className="relative group w-[250px] mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <img
                src={`${getImgUrl(book.coverImage)}`}
                alt={book.title}
                className="relative w-[250px] h-[350px] object-cover rounded-l shadow-l"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="md:w-2/3 space-y-4">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {book?.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                {book.title}
              </h1>
              <p className="text-xl text-purple-600">
                By {book.author || "admin"}
              </p>
            </div>

            <p className="text-sm text-gray-600">
              Published: {new Date(book?.createdAt).toLocaleDateString()}
            </p>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 leading-relaxed text-sm">
                {book.description}
              </p>
            </div>

            <button
              onClick={() => handleAddToCart(book)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg
                       flex items-center justify-center space-x-2 text-sm font-semibold
                       hover:from-purple-700 hover:to-pink-700
                       transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
