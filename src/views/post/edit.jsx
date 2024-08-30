import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import Swal from "sweetalert2"; // Import SweetAlert

export default function PostEdit() {
  // Mendefinisikan state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Validasi state
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  // Mengambil data berdasarkan id
  const { id } = useParams();

  // Membuat method fecthDetailPost
  const fecthDetailPost = async () => {
    await api
      .get(`/api/posts/${id}`)
      .then((response) => {
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  // Hook useEffect
  useEffect(() => {
    fecthDetailPost();
  }, []);

  // Membuat method pengaturan perubahan file
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Method kirim data untuk mengupdate post
  const updatePost = async (e) => {
    e.preventDefault();

    // Inisialisasi formData
    const formData = new FormData();

    // Menambahkan data
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("_method", "PUT");

    // Mengirim data ke API
    await api
      .post(`/api/posts/${id}`, formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Post berhasil diperbarui.",
        }).then(() => {
          navigate("/posts");
        });
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  return (
    <div className="p-5 ">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={updatePost}>
                <div className="my-3 mx-4">
                  <h2>Edit Post</h2>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Gambar
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={handleFileChange}
                    />
                    {errors.image && (
                      <div className="alert alert-danger mt-2">
                        {errors.image[0]}
                      </div>
                    )}
                  </div>
                  <label htmlFor="formFile" className="form-label">
                    Title
                  </label>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="title content"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                    <label htmlFor="floatingInput">Judul</label>
                    {errors.title && (
                      <div className="alert alert-danger mt-2">
                        {errors.title[0]}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Content
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="content"
                      onChange={(e) => setContent(e.target.value)}
                      value={content}
                    ></textarea>
                    {errors.content && (
                      <div className="alert alert-danger mt-2">
                        {errors.content[0]}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-primary mx-3"
                  >
                    Update
                  </button>
                  <button className="btn btn-outline-secondary" type="reset">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
