import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInFulfilled } from "../redux/user/userSlice";

export default function Oauth() {
  const dispatch = useDispatch();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const res = await signInWithPopup(auth, provider);
      console.log(res);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
        }),
      });
      const data = await response.json();
      console.log(data);
      dispatch(signInFulfilled(data));
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full bg-red-700 text-white py-2 px-4 rounded-lg"
      >
        Continue with google
      </button>
    </div>
  );
}
