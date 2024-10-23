import { redirect } from "next/dist/server/api-utils";
import { getCookie } from "cookies-next";
import axios from "axios";

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
    console.log(res.data.data);
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

const DetailFoodPage = (props) => {
  const { food } = props;
  console.log(food);
  return (
    <div>
      <div>
        <img src={food.imageUrl} alt="" />
        <p>{food.name}</p>
        <p>{food.description}</p>
      </div>
    </div>
  );
};
export default DetailFoodPage;
