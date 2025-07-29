import { useEffect } from "react";
import Login from "./screens/login/login";
import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isLoggedIn = false;

      if (isLoggedIn) {
        router.navigate('/screens/home/home');
      } else {
        return <Login/>
      }
    }, 1000)
    return () => clearTimeout(timeout);
  }, [router])

  return <Login/>
}
