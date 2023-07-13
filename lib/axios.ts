import axios from 'axios';


export default function AxiosClient(){


  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL
  });

  // instance.interceptors.request.use(async (request) => {
  //   const session = await getSession();
  //   if (session) {
  //     request.headers.Authorization = `Bearer ${session.access_token}`;
  //   }
  //   return request;
  // });

  // instance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     console.log(`error`, error);
  //   },
  // );

  return instance;
};