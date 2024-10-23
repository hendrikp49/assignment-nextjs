import { redirect } from "next/dist/server/api-utils";
import { getCookie } from "cookies-next";
import axios from "axios";
import Navbar from "./components/Navbar";
import Link from "next/link";

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
      `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${context.params.id}`,
      config
    );
    // console.log(res.data.data);
    return {
      props: {
        food: res.data.data,
      },
    };
  } catch (err) {
    console.log(err.response);
    return {
      props: {
        food: [],
      },
    };
  }
}

const tampilTanggal = (format) => {
  let result = "";

  for (let i = 0; i < format.length; i++) {
    if (
      format[i] === "0" ||
      format[i] === "1" ||
      format[i] === "2" ||
      format[i] === "3" ||
      format[i] === "4" ||
      format[i] === "5" ||
      format[i] === "6" ||
      format[i] === "7" ||
      format[i] === "8" ||
      format[i] === "9" ||
      format[i] === "-"
    ) {
      result += format[i];
    } else {
      break;
    }
  }
  return result;
};

const likeFood = (banyaknyaLike) => {
  let result = "";

  for (let i = 1; i <= banyaknyaLike; i++) {
    result += "👍";
  }
  return result;
};

const DetailFoodPage = (props) => {
  const { food } = props;
  // console.log(food);
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen text-white bg-[url('/img/repeat.webp')] bg-origin-content">
        <Navbar>
          <div className="flex col-span-2 gap-2 px-5 py-1 rounded-lg w-fit bg-slate-700 text-slate-400">
            <Link href="/">
              <span className="cursor-pointer hover:text-white">List Food</span>
            </Link>
            <span>/</span>
            <span className="">Detail Food</span>
          </div>
        </Navbar>
        <div className="flex flex-col w-full max-w-xs gap-2 pb-3 overflow-hidden border md:min-h-72 md:pb-0 md:max-w-lg md:flex-row rounded-xl">
          <div className="">
            <img
              src={food.imageUrl}
              alt={food.name}
              className="object-cover w-full h-64 rounded-b-lg md:h-full md:w-64 md:rounded-b-none md:rounded-r-lg"
            />
          </div>
          <div className="flex flex-col gap-10 px-2 md:gap-0 md:px-3 md:py-2 md:justify-between">
            <div className="flex flex-col gap-5 md:gap-10">
              <div className="space-y-1">
                <p className="text-lg font-medium">{food.name}</p>
                <p className="">{food.description}</p>
              </div>
              <div>
                <div className="flex items-center justify-between md:justify-start md:gap-4 md:items-start md:flex-col">
                  <div>
                    <p>Rating :</p>
                    <p>{food.rating} / 5</p>
                  </div>
                  <p>{likeFood(food.totalLikes)}</p>
                </div>
              </div>
            </div>
            <div>
              <p> Created at: {tampilTanggal(food.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailFoodPage;
