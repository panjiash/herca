# Tes Web Developer - Herca

Aplikasi ini dibangun untuk membantu dalam menghitung dan mengelola pembayaran komisi untuk tim marketing. Aplikasi ini menggunakan Node.js sebagai backend, React.js sebagai frontend, Express.js sebagai framework server, dan database MySQL untuk menyimpan data komisi.

## Fitur-fitur

- Data komisi grouping by nama marketing per bulan.
- Pengisian data pembayaran komisi berdasarkan penjualan atau kriteria lainnya.
- Perhitungan otomatis komisi berdasarkan aturan yang ditentukan.

## Tech Stack

- **Frontend**: React.js, React Router Dom
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Lainnya**: Axios (untuk komunikasi antara frontend dan backend)

## Cara menggunakan

#### 1. Clone Repository

```
git clone https://github.com/panjiash/herca.git
```

#### 2. Buat Database

Database yang saya gunakan adalah MySQL dengan nama database herca_tes.

```
create database herca_tes;
```

Setelah membuat database lalu import database yang ada pada repository / folder dengan command berikut:

```
mysql -u root -p ${password} herca_tes < ${path/to/database.sql}
```

#### 3. Installasi

Aplikasi ini dibuat dengan menggunakan bahasa pemrograman Node JS di sisi Backend dan React JS di sisi frontend.

- Installasi Backend

```
cd herca/backend
npm i
node .
```

Setelah command di atas dijalankan, maka terminal akan mengeluarkan output seperti ini:

```
Server running on port 5000..
```

Aplikasi backend kita sudah jalan di port 5000

- Installasi frontend

```
cd herca/frontend
npm i
npm start
```

Setelah command di atas dijalankan, maka akan menjalankan aplikasi React JS yang berjalan di PORT 3000 dengan url http://localhost:3000/herca dan aplikasi siap di gunakan.

## API Reference

#### Get data komisi

```http
  GET /komisi
```

#### Post Pembayaran

```http
  POST /komisi
    {
        "marketingId": 1,
        "bulan": "2023-05",
        "pay": 300000
    }
```

| Parameter     | Type      | Description                                                        |
| :------------ | :-------- | :----------------------------------------------------------------- |
| `marketingId` | `integer` | **Required**. untuk menentukan marketing mana yang akan dibayar    |
| `bulan`       | `string`  | **Required**. untuk menentukan periode bulan apa yang akan dibayar |
| `pay`         | `float`   | **Required**. untuk pembayaran menggunakan kredit                  |
