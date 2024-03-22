import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export const getKomisi = async (req, res) => {
  try {
    const data =
      await prisma.$queryRaw`SELECT m.id id_marketing, m.name AS marketing, DATE_FORMAT(p.date, '%M') AS bulan, DATE_FORMAT(p.date, '%Y-%m') AS period, SUM(p.total_balance) AS omzet, IF(SUM(p.total_balance) <= 100000000, '0%',  IF(SUM(p.total_balance) > 100000000 AND SUM(p.total_balance) < 200000000, '2.5%', IF(SUM(p.total_balance)>=200000000 AND SUM(p.total_balance)< 500000000, '5%', '10%'))) AS 'komisi_persen', IF(SUM(p.total_balance) <= 100000000, 0, IF(SUM(p.total_balance) > 100000000 AND SUM(p.total_balance) < 200000000, 0.025, IF(SUM(p.total_balance)>=200000000 AND SUM(p.total_balance)<500000000, 0.05, 0.1)) * SUM(p.total_balance)) AS 'komisi_nominal', (SELECT SUM(pay) FROM pembayaran WHERE marketing_id = m.id AND bulan = DATE_FORMAT(p.date, '%Y-%m')) AS total_bayar FROM penjualan p JOIN marketing m ON p.marketing_id = m.id GROUP BY m.name, DATE_FORMAT(p.date, '%M') ORDER BY DATE_FORMAT(p.date, '%Y-%m'), m.name ASC`;

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const bayarKomisi = async (req, res) => {
  try {
    const marketingId = parseInt(req.body.marketingId);
    const bulan = req.body.bulan || "0000-00";
    const pay = req.body.pay || 0;

    const cekKomisiNominal =
      await prisma.$queryRaw`SELECT IF(SUM(p.total_balance) <= 100000000, 0,  IF(SUM(p.total_balance) > 100000000 AND SUM(p.total_balance) < 200000000, 0.025,  IF(SUM(p.total_balance)>=200000000 AND SUM(p.total_balance)<500000000, 0.05, 0.1)) * SUM(p.total_balance)) AS 'komisi_nominal' FROM penjualan p JOIN marketing m ON p.marketing_id = m.id WHERE m.id = ${marketingId} AND DATE_FORMAT(p.date, '%Y-%m') = ${bulan}`;

    const cekBayar =
      await prisma.$queryRaw`SELECT SUM(pay) AS total_pay FROM pembayaran WHERE marketing_id = ${marketingId} AND bulan = ${bulan}`;

    const totalKomisi = cekKomisiNominal[0]?.komisi_nominal;
    const totalBayarKomisi = cekBayar[0]?.total_pay + pay;

    if (totalKomisi < totalBayarKomisi) {
      res.json({
        msg: "komisi melebihi batas",
      });
      return;
    }

    const curdate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS+00:00");
    await prisma.pembayaran.create({
      data: {
        date: curdate,
        marketing_id: marketingId,
        bulan,
        pay,
      },
    });
    res.json({
      msg: "sukses",
      totalKomisi,
      totalBayarKomisi,
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
