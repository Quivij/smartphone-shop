import React, { useEffect, useState } from "react";
import { useFetchProfile } from "../hooks/useFetchProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useUserStore } from "../store/useUserStore"; // Đảm bảo import đúng
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import react-toastify

const ProfilePage = () => {
  const { setUser, user } = useUserStore();
  const { data: profileData, isLoading, isError } = useFetchProfile();
  const { mutate, isLoading: isUpdating } = useUpdateProfile();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        address: profileData.address || "",
        avatar: profileData.avatar || null,
      });
      setAvatarPreview(
        profileData.avatar ? `http://localhost:3001${profileData.avatar}` : ""
      );
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("avatar-input").click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("email", formData.email);
    updatedData.append("phone", formData.phone);
    updatedData.append("address", formData.address);

    if (formData.avatar instanceof File) {
      updatedData.append("avatar", formData.avatar);
    }

    mutate(updatedData, {
      onSuccess: (data) => {
        const avatarUrl = data.user.avatar?.startsWith("http")
          ? data.user.avatar
          : data.user.avatar
          ? `http://localhost:3001${data.user.avatar}?t=${Date.now()}` // cache busting
          : avatarPreview;

        const updatedUser = {
          ...user, // giữ thông tin cũ (nếu có)
          ...data.user, // cập nhật toàn bộ dữ liệu mới từ server
          avatar: avatarUrl, // override avatar để chắc chắn link đầy đủ
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success("Cập nhật thông tin thành công!");
        navigate("/"); // Di chuyển về trang chính hoặc trang cần thiết sau khi cập nhật
      },

      onError: () => {
        toast.error("Cập nhật thông tin thất bại, thử lại!");
      },
    });
  };

  if (isLoading) return <div>Đang tải thông tin...</div>;
  if (isError) return <div>Lỗi tải thông tin. Vui lòng thử lại sau!</div>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Thông tin cá nhân</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Avatar Preview */}
        <div onClick={handleAvatarClick} className="cursor-pointer">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl mx-auto">
              {formData.name ? (
                formData.name.charAt(0).toUpperCase()
              ) : (
                <FontAwesomeIcon icon={faUserCircle} className="text-4xl" />
              )}
            </div>
          )}
        </div>

        {/* Upload Avatar (Hidden Input) */}
        <input
          id="avatar-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Form fields */}
        {[
          { label: "Họ và tên", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Số điện thoại", name: "phone", type: "text" },
          { label: "Địa chỉ", name: "address", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block mb-1">{label}:</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isUpdating}
          className={`w-full py-2 rounded text-white ${
            isUpdating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
