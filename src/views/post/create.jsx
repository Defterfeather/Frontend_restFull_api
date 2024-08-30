import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api";

export default function PostCreate() {
  // Mendefinisikan state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Validasi state
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  // Membuat method pengaturan perubahan file
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Method untuk mengirim data store post
  const storePost = async (e) => {
    e.preventDefault();

    // Inisialisasi formData
    const formData = new FormData();

    // Menambahkan data
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);

    // Set Api for send data
    await api
      .post("/api/posts", formData)
      .then(() => {
        // Tampilkan SweetAlert jika berhasil
        Swal.fire({
          title: 'Berhasil!',
          text: 'Post baru berhasil dibuat.',
          icon: 'success',
          confirmButtonText: 'OK'
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
              <form onSubmit={storePost}>
                <div className="my-3 mx-4">
                  <h2>New Post</h2>
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
                    Tambah
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
