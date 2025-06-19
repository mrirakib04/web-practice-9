import { updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { UserMainContext } from "../../Context/UserContext";

const Profile = () => {
  const { name, setName, image, setImage, user } = useContext(UserMainContext);
  const [isNameSubmitting, setIsNameSubmitting] = useState(false);
  const [isImageSubmitting, setIsImageSubmitting] = useState(false);

  const updateName = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setIsNameSubmitting(true);
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        toast.success(`Name updated successfully.`, {
          position: "top-center",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
        setName(name);
        setIsNameSubmitting(false);
      })
      .catch((error) => {
        toast.error(`Name update failed: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsNameSubmitting(false);
      });

    name; // ei placeholder ager moto hoye jabe
  };
  const updateImage = (e) => {
    e.preventDefault();
    const imageURL = e.target.imageURL.value;
    setIsImageSubmitting(true);
    updateProfile(auth.currentUser, {
      photoURL: imageURL,
    })
      .then(() => {
        toast.success(`Photo updated successfully.`, {
          position: "top-center",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
        setImage(imageURL);
        setIsImageSubmitting(false);
      })
      .catch((error) => {
        toast.error(`Photo update failed: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsImageSubmitting(false);
      });
  };

  return (
    <div className="w-full flex flex-col gap-5 items-center mt-5 sm:mt-10">
      <div className="md:px-10 sm:px-5 px-2">
        <div className="py-10 flex flex-col items-center gap-3 px-5 text-center rounded-xl shadow-lg shadow-gray-500 border-b-2 border-cyan-800">
          <img
            className="md:w-40 sm:w-36 w-28 md:h-40 sm:h-36 h-28 rounded-full object-cover"
            src={image}
            alt={name}
          />
          <h2 className="font-bold md:text-3xl sm:text-2xl text-lg">{name}</h2>
          <p className="md:text-2xl sm:text-xl text-sm font-medium">
            Email: {user.email}
          </p>
        </div>
      </div>

      <div className="mt-10 mb-20 py-10 bg-cover lg:w-1/3 md:w-2/4 sm:w-3/5 bg-center w-full rounded-lg flex flex-col gap-6 px-5 mx-auto">
        <form
          onSubmit={updateName}
          className="w-full mx-auto flex flex-col gap-2 items-start"
        >
          <input
            required
            name="name"
            type="text"
            placeholder="New Name"
            className="placeholder:text-lg placeholder:font-medium py-2 px-2 w-full rounded-md shadow-md shadow-gray-500"
          />
          <button className="text-lg font-semibold text-center px-10 rounded-md text-white py-2 bg-emerald-600 shadow-md shadow-gray-400 border-b-2 border-r-2 border-emerald-800">
            {isNameSubmitting ? "Updating..." : "Update Name"}
          </button>
        </form>
        <form
          onSubmit={updateImage}
          className="w-full mx-auto flex flex-col gap-2 items-start"
        >
          <input
            required
            name="imageURL"
            type="text"
            placeholder="New Photo URL"
            className="placeholder:text-lg placeholder:font-medium py-2 px-2 w-full rounded-md shadow-md shadow-gray-500"
          />
          <button className="text-lg font-semibold text-center px-10 rounded-md text-white py-2 bg-emerald-600 shadow-md shadow-gray-400 border-b-2 border-r-2 border-emerald-800">
            {isImageSubmitting ? "Updating..." : "Update Photo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
