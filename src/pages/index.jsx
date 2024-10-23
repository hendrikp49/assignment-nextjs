import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  try {
    const token = getCookie("token", { req: context.req, res: context.res });

    if (!token) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    const config = {
      headers: {
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      "https://api-bootcamp.do.dibimbing.id/api/v1/foods",
      config
    );
    // console.log(res.data);
    // console.log(res.data.ingredients);
    return {
      props: {
        products: res.data.data,
      },
    };
  } catch (error) {
    // console.log(error.response);
    return {
      props: {
        products: [],
      },
    };
  }
}

const HomePage = (props) => {
  const { products } = props;
  // console.log(products);
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/auth/login");
  };

  return (
    <div>
      <div className="text-white bg-[url('/img/repeat.webp')] bg-origin-content">
        <h1 className="text-5xl font-bold">Welcome!</h1>
        <button onClick={handleLogout}>Logout</button>
        <div className="grid grid-cols-1 gap-4 mx-auto duration-200 ease-in-out sm:gap-7 max-w-60 lg:grid-cols-4 md:grid-cols-3 sm:max-w-lg md:max-w-3xl lg:max-w-5xl sm:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between gap-10 pb-5 overflow-hidden transition-all duration-300 ease-in-out bg-transparent border border-teal-500 shadow-sm hover:-translate-y-3 hover:shadow-lg hover:shadow-teal-200 shadow-teal-500 rounded-xl"
            >
              <div className="space-y-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-40 rounded-b-md"
                />
                <div className="flex flex-col gap-2 px-2 ">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-slate-400">
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="px-2">
                <Link href={`/${product.id}`}>
                  <button className="w-full py-1 duration-200 ease-in-out bg-teal-500 rounded-md hover:bg-teal-600">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
