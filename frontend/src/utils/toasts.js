import { toast } from "react-toastify";
import "./utils.css";
export function NormalToast(message) {
  return toast(message, {
    position: "bottom-center",
    hideProgressBar: true,
    autoClose: 1500,
    className: "toast_normal",
    closeButton: true,
  });
}
