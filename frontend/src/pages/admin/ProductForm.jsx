import { useState } from "react";

const ProductForm = ({ initialValues = {}, onSubmit, isEdit }) => {
  const [form, setForm] = useState({
    name: initialValues.name || "",
    description: initialValues.description || "",
    price: initialValues.price || "",
    category: initialValues.category || "",
    brand: initialValues.brand || "",
    specifications: initialValues.specifications || {},
    variants: initialValues.variants || [{ color: "", stock: "", images: [] }],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSpecsChange = (e) => {
    setForm({
      ...form,
      specifications: {
        ...form.specifications,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...form.variants];
    updated[index][field] = value;
    setForm({ ...form, variants: updated });
  };

  const handleVariantImagesChange = (index, files) => {
    const updated = [...form.variants];
    updated[index].images = files;
    setForm({ ...form, variants: updated });
  };

  const handleAddVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, { color: "", stock: "", images: [] }],
    });
  };

  const handleRemoveVariant = (index) => {
    const updated = [...form.variants];
    updated.splice(index, 1);
    setForm({ ...form, variants: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Thông tin cơ bản
    for (let key of ["name", "description", "price", "brand", "category"]) {
      formData.append(key, form[key]);
    }

    // Specifications
    formData.append("specifications", JSON.stringify(form.specifications));

    // Variants
    form.variants.forEach((variant, i) => {
      formData.append(`variants[${i}][color]`, variant.color);
      formData.append(`variants[${i}][stock]`, variant.stock);
      for (let file of variant.images) {
        formData.append(`variants[${i}][images]`, file);
      }
    });

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Thông tin cơ bản */}
      {["name", "description", "price", "brand", "category"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      ))}

      {/* Specifications */}
      <div className="grid grid-cols-2 gap-2">
        {["screen", "cpu", "ram", "storage", "battery", "camera", "os"].map(
          (spec) => (
            <input
              key={spec}
              name={spec}
              placeholder={`Thông số: ${spec}`}
              value={form.specifications[spec] || ""}
              onChange={handleSpecsChange}
              className="border p-2 rounded"
            />
          )
        )}
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Biến thể sản phẩm (màu sắc)</h3>
        {form.variants.map((variant, index) => (
          <div
            key={index}
            className="border p-4 rounded-md bg-gray-50 relative space-y-2"
          >
            <input
              placeholder="Màu sắc"
              value={variant.color}
              onChange={(e) =>
                handleVariantChange(index, "color", e.target.value)
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Tồn kho"
              value={variant.stock}
              onChange={(e) =>
                handleVariantChange(index, "stock", e.target.value)
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="file"
              multiple
              onChange={(e) => handleVariantImagesChange(index, e.target.files)}
              className="w-full"
            />
            <button
              type="button"
              onClick={() => handleRemoveVariant(index)}
              className="absolute top-2 right-2 text-red-500 text-sm"
            >
              Xoá
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddVariant}
          className="text-blue-600 font-semibold"
        >
          + Thêm biến thể
        </button>
      </div>

      <button type="submit" className="btn btn-primary mt-4">
        {isEdit ? "Cập nhật" : "Tạo"} sản phẩm
      </button>
    </form>
  );
};

export default ProductForm;
