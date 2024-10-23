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
    console.log(res.data);
    // console.log(res.data.ingredients);
    return {
      props: {
        products: res.data.data,
      },
    };
  } catch (error) {
    console.log(error.response);
    return {
      props: {
        products: [],
      },
    };
  }
}

const HomePage = (props) => {
  const { products } = props;
  console.log(products);
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/auth/login");
  };

  return (
    <div>
      <h1 className="text-5xl">Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.imageUrl} alt="" />
          <p>{product.name}</p>
          <p>{product.description}</p>
          <Link href={`/${product.id}`}>
            <button className="border">Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
