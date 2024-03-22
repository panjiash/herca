import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../config";
import { formatRupiah } from "../function";
import AddKomisi from "../components/AddKomisi";

const Dashboard = () => {
  const [datas, setDatas] = useState([]);

  const getKomisi = async () => {
    try {
      const response = await axios.get(`${server}komisi`);
      setDatas(response?.data);
    } catch (error) {
      setDatas([]);
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    getKomisi();
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="d-block mt-5 text-center">Data Penjualan</h1>
        <div className="row mt-2">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-sm table-striped table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th className="text-center">No</th>
                      <th className="text-center">Marketing</th>
                      <th className="text-center">Bulan</th>
                      <th className="text-center">Omzet</th>
                      <th className="text-center">Komisi %</th>
                      <th className="text-center">Komisi Nominal</th>
                      <th className="text-center">Pembayaran Komisi</th>
                      <th className="text-center">Opsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas &&
                      datas.map((data, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{data.marketing}</td>
                          <td>{data.bulan}</td>
                          <td className="text-end">
                            {formatRupiah(data.omzet)}
                          </td>
                          <td className="text-center">{data.komisi_persen}</td>
                          <td className="text-end">
                            {formatRupiah(data.komisi_nominal)}
                          </td>
                          <td className="text-end">
                            {formatRupiah(data?.total_bayar)}
                          </td>
                          <td>
                            {data?.komisi_nominal === data?.total_bayar ||
                            data?.komisi_nominal === 0 ? (
                              ""
                            ) : (
                              <AddKomisi data={data} getData={getKomisi} />
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
