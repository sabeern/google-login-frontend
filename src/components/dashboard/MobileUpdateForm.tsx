import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  toasterFailureFunction,
  toasterSuccessFunction,
} from "../../helpers/toastHelper";
import useAuth from "../../hooks/useAuth";
import { RingLoader } from "react-spinners";

function MobileUpdateForm({ mobile }: { mobile: string | undefined }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const schema = z.object({
    mobile: z
      .string({
        required_error: "Mobile is required.",
      })
      .min(1, "Mobile is required.")
      .refine((val) => /^\d{10}$/.test(val), {
        message: "Enter valid mobile number.",
      }),
  });
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: Record<string, string>) => {
    try {
      setLoading(true);
      const result = await axiosPrivate.post("/profile/update-mobile", data);
      setValue("mobile", result?.data?.mobile);
      setAuth((prev) => {
        if (!prev) return null;
        return { ...prev, mobile: result?.data?.mobile };
      });
      toasterSuccessFunction("Updated successfully.");
    } catch (err) {
      if (err instanceof AxiosError) {
        return setError(err.response?.data?.errorMessage);
      }
      setError("Failed to update mobile.");
      toasterFailureFunction("Failed to update.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (mobile) {
      setValue("mobile", mobile);
    }
  }, [mobile]);
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <RingLoader color="#2563eb" size={80} />
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-gray-700">
        Note: Please enter your mobile number for getting Google event
        notifications.
      </p>
      <div className="mt-4 flex flex-row gap-2 items-center justify-center">
        <label htmlFor="mobile">Mobile</label>
        <input
          type="text"
          className="p-1 border-2 rounded"
          {...register("mobile", { required: true })}
        />
      </div>
      <span className="text-red-500">
        {errors.mobile && <p>{errors.mobile.message}</p>}
      </span>
      <span className="text-red-500">{error && <p>{error}</p>}</span>
      {mobile ? (
        <div className="mt-4">
          <button className="border-2 border-blue-700 text-white px-4 py-2 rounded bg-blue-700 hover:bg-white hover:text-black font-semibold">
            Update Mobile
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <button className="border-2 border-blue-700 text-white px-4 py-2 rounded bg-blue-700 hover:bg-white hover:text-black font-semibold">
            Add Mobile
          </button>
        </div>
      )}
    </form>
  );
}

export default MobileUpdateForm;
