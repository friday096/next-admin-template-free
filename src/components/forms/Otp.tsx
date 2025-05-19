import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const OtpVerification = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    // Fake OTP validation
    if (data.otp === "123456") {
      router.push("/dashboard"); // Redirect to protected route
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Enter OTP</h2>

      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        {...register("otp")}
        className="w-full p-2 border rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default OtpVerification;
