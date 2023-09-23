import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { userInfo } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  // console.log(uploadPercentage);
  // console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          id="email"
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
          Update
        </button>
      </form>
      <div className="flex justify-between items-center mt-1">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
