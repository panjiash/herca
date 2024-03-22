export const formatRupiah = (angka) => {
  var reverse = angka?.toString().split("").reverse().join(""),
    ribuan = reverse?.match(/\d{1,3}/g);
  ribuan = ribuan?.join(".").split("").reverse().join("");
  return ribuan || 0;
};

export const rupiahs = () => {
  var rupiah = document.getElementById("rupiah");
  rupiah?.addEventListener("keyup", function (e) {
    rupiah.value = frh(this.value, "");
  });

  function frh(angka, prefix) {
    var number_string = angka?.replace(/[^,\d]/g, "").toString(),
      split = number_string?.split(","),
      sisa = split[0]?.length % 3,
      rupiah = split[0]?.substr(0, sisa),
      ribuan = split[0]?.substr(sisa).match(/\d{3}/gi);
    if (ribuan) {
      var separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "" + rupiah : "";
  }
};
