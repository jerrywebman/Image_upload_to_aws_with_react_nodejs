
import { useForm } from "react-hook-form";
import axios from "axios"


function App() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    // console.log(data);
    // console.log(data.cvUpload)
    let file = data.cvUpload[0];
    //delete cvUpload
    delete data.cvUpload;
    const newData = { ...data, cvUpload: file };
    console.log(newData);
    const url = "http://localhost:4000/api/upload";
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        data: newData,
        url,
      };
      axios(options).then((res) => {
        console.log(res)
      });
    } catch (error) {
      console.log("Error Msg:", error);
    }

  };


  return (
    <div className=" mt-20">
      <form
        onSubmit={handleSubmit(submitForm)}
        method="POST"
        encType="multipart/form-data"
        className="space-y-2 p-10 max-w-5xl pb-20 mx-2 lg:mx-auto bg-gray-300 rounded-lg shadow shadow-grey-300 -mt-16 mb-12 lg:z-50"
      >
        <div className="space-y-2 my-16">
          <label htmlFor="name" className="font-medium text-3xl block">
            Fullname
            <span className="text-red-700 text-xs"> *</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className={`p-3 rounded-lg border w-full focus:shadow-lg !outline-none ${errors.fullname ? "border-red-700" : "border-gray-300 "
              }`}
            {...register("fullname", { required: "fullname is required" })}
          />
          <p className="text-red-400 text-xs">{errors.fullname?.message}</p>
          <label htmlFor="name" className="font-medium text-3xl block">
            age
            <span className="text-red-700 text-xs"> *</span>
          </label>
          <input
            type="text"
            placeholder="Enter your age"
            className={`p-3 rounded-lg border w-full focus:shadow-lg !outline-none ${errors.fullname ? "border-red-700" : "border-gray-300 "
              }`}
            {...register("age", { required: "age is required" })}
          />
          <p className="text-red-400 text-xs">{errors.age?.message}</p>
          <div className="my-8">
            <label className="block mb-2 text-3xl font-medium " for="file_input">
              Upload CV/Resume
              <span className="text-red text-xs"> *</span>
            </label>
            <input
              className={`block w-full text-sm text-black p-2 border ${errors.cvUpload ? "border-red-700 " : "border-gray-300 "
                } cursor-pointer bg-gray-300 `}
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              {...register("cvUpload", { required: "Please upload a doc" })}
              accept=".pdf, .docx, .doc"
            />
            <p
              className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              <span className=" text-xs">
                {" "}
                Allowed Type(s): .pdf, .docx, .doc
              </span>
            </p>
          </div>
          <button type="submit"
            className="bg-green-400 rounded text-white mb-10 p-4"
          >Upload</button>
        </div>
      </form>
    </div>
  );
}

export default App;
