const { Tanaman } = require("../models");
module.exports = {
  // Endpoint GET /usergame
  //   index: async (req, res) => {
  //     try {
  //       const data = await Tanaman.findAll();
  //       if (data.length > 0) {
  //         res.status(200).json({
  //           status: "200",
  //           data: data,
  //         });
  //       } else {
  //         res.status(200).json({
  //           message: "tidak ada data",
  //           data: [],
  //         });
  //       }
  //     } catch (error) {
  //       res.status(402).json({
  //         message: error,
  //       });
  //     }
  //   },

  index: (req, res) => {
    Tanaman.findAll({
      order: [["id", "ASC"]],
    })
      .then((users) => {
        res
          .status(200)
          .json({ message: "Success Get All tanaman", data: users });
      })
      .catch((err) => {
        res.status(401).json({ message: err });
      });
  },

  indexView: (req, res) => {
    Tanaman.findAll({
      order: [["id", "ASC"]],
    }).then((users) => {
      res.render("tanaman", { users });
    });
  },

  adminView: (req, res) => {
    Tanaman.findAll({
      order: [["id", "ASC"]],
    }).then((users) => {
      res.render("admin", { users });
    });
  },

  create: async (req, res) => {
    // console.log(req.file)
    try {
      await Tanaman.create({
        nama: req.body.nama,
        kategori: req.body.kategori,
        lokasi: req.body.lokasi,
        deskripsi: req.body.deskripsi,
        img: req.file.filename,
      });
      res.status(201).json({ message: "Created Data Tanaman Successfuly" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addView: (req, res) => {
    res.render("add");
  },

  createView: async (req, res) => {
    // console.log(req.file)
    // addApi: (req, res) => {
    //     const {username, password} = req.body;
    //     UserGame.create(
    //         {username, password}
    //     )
    //     .then(user => {
    //         res.status(200).json({ message: "Success Create User", data: user });
    //     })
    //     .catch(err => {
    //         res.status(401).json({ message: err})
    //     })
    // },

    try {
      await Tanaman.create({
        nama: req.body.nama,
        kategori: req.body.kategori,
        lokasi: req.body.lokasi,
        deskripsi: req.body.deskripsi,
        //img: req.body.img,
        img: req.file.filename,
      });
      res.redirect("/admin");
      //res.status(201).json({ message: "Created Successfuly" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    Tanaman.update(
      {
        nama: req.body.nama,
        kategori: req.body.kategori,
        lokasi: req.body.lokasi,
        deskripsi: req.body.deskripsi,
        img: req.file.filename,
      },
      { where: { id: +req.params.id } }
    )
      .then((user) => {
        res
          .status(200)
          .json({ message: "Success Update Data Tanaman", data: user });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({ message: err });
      });
  },
  showView: (req, res) => {
    Tanaman.findOne({
      where: { id: +req.params.id },
    })
      .then((user) => {
        res.render("edit", { user });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send("Tidak Menemukan Data Tanaman");
      });
  },

  updateView: async (req, res) => {
    // try {
    //     await Tanaman.update({
    //       nama: req.body.nama,
    //       kategori: req.body.kategori,
    //       lokasi: req.body.lokasi,
    //       deskripsi: req.body.deskripsi,
    //       //img: req.body.img,
    //       img: req.file.filename,
    //     },{ where: { id: +req.params.id } } );
    //      res.redirect("/admin");
    //     //res.status(201).json({ message: "update Successfuly" });
    //   } catch (error) {
    //     res.status(500).json({ message: error.message });
    //   }
    // //////////////////
    try {
      if (req.file) {
        var data = {
          nama: req.body.nama,
          kategori: req.body.kategori,
          lokasi: req.body.lokasi,
          deskripsi: req.body.deskripsi,
          //img: req.body.img,
          img: req.file.filename,
        };
      } else {
        var data = {
          nama: req.body.nama,
          kategori: req.body.kategori,
          lokasi: req.body.lokasi,
          deskripsi: req.body.deskripsi,
        };
      }

      await Tanaman.update(data, { where: { id: +req.params.id } });
      res.redirect("/admin");
      //res.status(201).json({ message: "update Successfuly" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  detil: async (req, res) => {
    // const id = req.params.id;
    Tanaman.findOne({
      where: { id: +req.params.id },
      //   where: { id: id },
      //   attributes: ["nama", "kategori", "lokasi", "deskripsi", "img"],
    })
      .then((data) => {
        res.status(200).json({ message: "Success data tanaman", data: data });
      })
      .catch((err) => {
        res.status(401).json({ message: err });
      });
  },

  detilView: async (req, res) => {
    const id = req.params.id;
    Tanaman.findOne({
      where: { id: id },
      attributes: ["nama", "kategori", "lokasi", "deskripsi", "img"],
      // where: { id: +req.params.id }
    })
      .then((users) => {
        res.render("detil", { users });
        //res.status(200).json({ message: "Success data tanaman", data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({ message: err });
      });
  },
  deleteApi: (req, res) => {
    Tanaman.destroy({
      where: { id: +req.params.id },
    })
      .then((user) => {
        res.status(200).json({ message: "Success Delete User", data: user });
      })
      .catch((err) => {
        res.status(401).json({ message: err });
      });
  },

  deleteView: (req, res) => {
    Tanaman.destroy({
      where: { id: +req.params.id },
    })
      .then((user) => {
        res.redirect("/admin");
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Gagal delete user");
      });
  },
};
