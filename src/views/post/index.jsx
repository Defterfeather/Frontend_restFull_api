import { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function PostIndex() {
  const [posts, setPosts] = useState([]);

  const fetchDataPosts = async () => {
    await api.get("/api/posts").then((response) => {
      console.log(response.data.data.data);
      setPosts(response.data.data.data);
    });
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  const deletePost = async (id) => {
    // Tampilkan konfirmasi sebelum menghapus
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Post ini akan dihapus secara permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    // Jika pengguna menekan "Ya, hapus!"
    if (result.isConfirmed) {
      await api.delete(`/api/posts/${id}`).then(() => {
        fetchDataPosts();
        // Tampilkan SweetAlert jika berhasil menghapus
        Swal.fire({
          title: 'Dihapus!',
          text: 'Post berhasil dihapus.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }).catch((error) => {
        Swal.fire({
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat menghapus post.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="col-md-12">
        <Link
          to="/posts/create"
          className="btn btn-md btn-success rounded shadow border-0 mb-3"
        >
          Tambah POST Baru
        </Link>
        <div className="card border-0 rounded shadow">
          <div className="card-body">
            <table className="table table-bordered">
              <thead className="ng-drak text-center">
                <tr>
                  <th scope="col">Gambar</th>
                  <th scope="col">Title</th>
                  <th scope="col">Konten</th>
                  <th scope="col" style={{ width: "15%" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {posts && posts.length > 0 ? (
                  posts.map((post, index) => (
                    <tr key={index} className="position-relative">
                      <td className="text-center">
                        <img
                          src={post.image}
                          alt={post.title}
                          width="200"
                          className="rounded"
                        />
                      </td>
                      <td className="text-center align-middle">{post.title}</td>
                      <td className="text-center align-middle">{post.content}</td>
                      <td className="text-center align-middle">
                        <div className="d-flex justify-content-center align-items-center">
                          <Link
                            to={`/posts/edit/${post.id}`}
                            className="btn btn-sm btn-info rounded-sm shadow border-0 me-2"
                          >
                            EDIT
                          </Link>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="btn btn-sm btn-danger rounded-sm shadow border-0"
                          >
                            HAPUS
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center" colSpan="4">
                      <div className="alert alert-danger mb-0">
                        Tidak ada data POST
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
