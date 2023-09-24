import { useState, useRef, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateFulfilled,
  updateRejected,
  updatePending,
  deleteAccountFulfilled,
  deleteAccountRejected,
  deleteAccountPending,
  signOut,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { userInfo } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // console.log(uploadPercentage);
  // console.log(formData);
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updatePending);
      const res = await fetch(`/api/users/update/${userInfo._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === false) {
        dispatch(updateRejected(data.message));
      }
      dispatch(updateFulfilled(data));
      setIsSuccess(true);
    } catch (error) {
      dispatch(updateRejected(error));
    }
  };

  const handleImageUpload = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.floor(progress));
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const deleteAccount = async () => {
    try {
      dispatch(deleteAccountPending);
      const res = await fetch(`/api/users/delete/${userInfo._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteAccountRejected(data.message));
        return;
      }
      dispatch(deleteAccountFulfilled(data));
    } catch (error) {
      dispatch(deleteAccountRejected(error));
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await fetch("/api/auth/logout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
      console.log(image);
    }
  }, [image]);
  return (
    // allow read;
    // allow write: if
    // request.resource.size < 2 * 1024 &&
    // request.resource.contentType.matches('image/.*')
    <div className="max-w-lg mx-auto p-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <h3 className="font-semibold text-lg text-center my-7">Profile</h3>
        <img
          src={formData.profilePicture || userInfo.profilePicture}
          alt="profile picture"
          className="object-cover w-24 h-24 rounded-full self-center cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {uploadError ? (
            <span className="text-red-500">Error uploading image</span>
          ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
            <span className="text-slate-700">{`Uploading: ${uploadPercentage} %`}</span>
          ) : uploadPercentage === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="User Name"
          id="userName"
          defaultValue={userInfo.userName}
          className="bg-slate-100 rounded-md p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={userInfo.email}
          className="bg-slate-100 rounded-md p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 rounded-md p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-center text-white py-2 px-4 uppercase disabled:opacity-95 rounded-lg">
          {isLoading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between items-center mt-1">
        <span className="text-red-600 cursor-pointer" onClick={deleteAccount}>
          Delete Account
        </span>
        <span className="text-red-600 cursor-pointer" onClick={handleLogOut}>
          Sign Out
        </span>
      </div>
      <div>
        {isSuccess ? (
          <span className="text-green-700 text-sm">
            Profile updated successfully
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
