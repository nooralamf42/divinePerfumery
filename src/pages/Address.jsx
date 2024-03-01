import React from "react";
import { Container } from "../components";
import { useSelector } from "react-redux";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";

function Address() {
  let userAddress = useSelector((state) => state.userAddress);
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/addAddress");
  };
  return (
    <section>
      <Container>
        {userAddress!==null ? (
          <section className="dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                    Address
                  </h1>
                  <h2 className="text-xl">
                    <span className="font-semibold">Street : </span>{userAddress.street}
                  </h2>
                  <h2 className="text-xl">
                    <span className="font-semibold">City : </span>{userAddress.city}
                  </h2>
                  <h2 className="text-xl">
                    <span className="font-semibold">State : </span>{userAddress.state}
                  </h2>
                  <h2 className="text-xl">
                    <span className="font-semibold">Pincode : </span>{userAddress.pincode}
                  </h2>
                  <h2 className="text-xl">
                    <span className="font-semibold">Mobile Number : </span>{userAddress.mobile}
                  </h2>
                  <Button name={"Update address"} onClick={clickHandler} />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="text-center">
            <h1 className="text-xl mt-12 mb-2">you dont have any address!</h1>
            <Button name={"Add address"} onClick={clickHandler} />
          </div>
        )}
      </Container>
    </section>
  );
}

export default Address;
