const { Tanaman } = require("../models");
export const getDetilById = async (req, res) => {
    // const id = req.params.id;
    if(req.file){
        var data={
        nama: req.body.nama,
        kategori: req.body.kategori,
        lokasi: req.body.lokasi,
        deskripsi: req.body.deskripsi,
        //img: req.body.img,
        img: req.file.filename,
        }
    }else{
        var data={
            nama: req.body.nama,
            kategori: req.body.kategori,
            lokasi: req.body.lokasi,
            deskripsi: req.body.deskripsi,
           
        }
    }
    try {
        await Tanaman.update({
         data
        },{ where: { id: +req.params.id } } );
         res.redirect("/admin");
        //res.status(201).json({ message: "update Successfuly" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
         
  };