import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { formatRupiah, rupiahs } from "../function";
import axios from "axios";
import { server } from "../config";

function AddKomisi({ getData, data }) {
  const [bayar, setBayar] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState(false);
  const handleClose = () => {
    setShow(false);
    getData();
  };
  const handleShow = () => setShow(true);
  const save = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${server}komisi`, {
        marketingId: data?.id_marketing,
        bulan: data?.period,
        pay: parseInt(bayar),
      });
      setShow(false);
      getData();
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const cBayar = (e) => {
    if (
      data?.komisi_nominal - data?.total_bayar <
      e.target.value.replace(/\./g, "")
    ) {
      setMsg(true);
      setBayar(0);
    } else {
      setMsg(false);
      setBayar(e.target.value.replace(/\./g, ""));
    }
  };

  return (
    <>
      <span
        className="badge bg-success"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      >
        Bayar
      </span>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={save}>
          <Modal.Header closeButton>
            <Modal.Title>{data?.marketing}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Bulan</label>
                <input
                  type="text"
                  className="form-control"
                  value={data?.bulan}
                  disabled
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Omzet</label>
                <input
                  type="text"
                  className="form-control"
                  value={formatRupiah(data?.omzet)}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Komisi</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.komisi_persen}
                  disabled
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Komisi Nominal</label>
                <input
                  type="text"
                  className="form-control"
                  value={formatRupiah(data?.komisi_nominal)}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Sisa</label>
                <input
                  type="text"
                  className="form-control"
                  value={formatRupiah(data?.komisi_nominal - data?.total_bayar)}
                  disabled
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label className={`form-label ${msg ? "text-danger" : ""}`}>
                  Bayar
                </label>
                <input
                  type="text"
                  className={`form-control ${msg ? "is-invalid" : ""}`}
                  autoFocus
                  required
                  value={rupiahs(bayar)}
                  id="rupiah"
                  onChange={cBayar}
                />
              </div>
              {msg && (
                <small className="text-danger">
                  Bayar lebih besar dari sisa
                </small>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={msg}>
              Simpan
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddKomisi;
