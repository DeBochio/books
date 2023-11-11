import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import { useParams } from "react-router-dom";
import { LivrosService } from "../../api/LivrosService";

const LivrosEdicao = () => {
  let { livroId } = useParams();

  const [livro, setLivro] = useState([]);

  async function getLivro() {
    const { data } = await LivrosService.getLivro(livroId);
    setLivro(data);
  }

  async function editLivro() {
    const body = {
      id: Number(livro.id),
      Title: livro.Title,
      NPages: Number(livro.NPages),
      ISBN: livro.ISBN,
      Publishers: livro.Publishers,
    };
    if (
      livro.id != undefined &&
      livro.id != "" &&
      livro.Title != undefined &&
      livro.Title != "" &&
      livro.NPages != undefined &&
      livro.NPages != "" &&
      livro.ISBN != undefined &&
      livro.ISBN != "" &&
      livro.Publishers != undefined &&
      livro.Publishers != ""
    ) {
      await LivrosService.updateLivro(livroId, body)
        .then(({ data }) => {
          alert(data.mensagem);
        })
        .catch(({ response: { data, status } }) => {
          alert(`${status} - ${data}`);
        });
    }
  }

  useEffect(() => {
    getLivro();
  }, []);

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className="form-group">
              <label>Id</label>
              <input
                type="text"
                disabled
                required
                onChange={(event) => {
                  setLivro({ ...livro, id: event.target.value });
                }}
                value={livro.id || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, Title: event.target.value });
                }}
                value={livro.Title || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, NPages: event.target.value });
                }}
                value={livro.NPages || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, ISBN: event.target.value });
                }}
                value={livro.ISBN || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, Publishers: event.target.value });
                }}
                value={livro.Publishers || ""}
              ></input>
            </div>
            <div className="form-group">
              <button
                onClick={() => {
                  editLivro();
                }}
              >
                Atualizar Livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
