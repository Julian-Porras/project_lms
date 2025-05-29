export default function ToastMessage(res, fallback = "Something went wrong. Please try again later.") {
  if (!res) return fallback;

  if (typeof res === "string") return res;

  if (res?.data?.message) return res.data.message;

  if (res?.message) return res.message;

  return fallback;
}