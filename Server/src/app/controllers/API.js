const pool = require("../models/pool");
const fs = require("fs");
const express = require("express");
const path = require("path");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRound = 7;
const encodeToken = require("../../util/encodeToken");
const CronJob = require("cron").CronJob;
const io = require("socket.io-client");
const job = [];
const trading = [];
const paypal = require("paypal-rest-sdk");
paypal.configure({
  mode: process.env.PP_MODE,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.PP_SECRET_KEY,
});

class API {
  // [POST] /api
  index(req, res, next) {}

  // [POST] /api/register
  register(req, res, next) {
    const insertSql =
      "insert into customerdata (email, username, password) value (?,?,?)";
    const errorMsg = "Đã có lỗi xảy ra, vui lòng thử lại!";
    const successMsg = "Tài khoản đã đăng kí thành công!";
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRound, (err, hash) => {
      if (err) {
        res.status(200).send({ message: errorMsg, checked: false });
      } else {
        pool.query(
          insertSql,
          [email, username, hash],
          function (error, results, fields) {
            if (error) {
              res.send({ message: errorMsg, checked: false });
            } else {
              res.send({ message: successMsg, checked: true });
            }
          }
        );
      }
    });
  }
  // [GET] /api/isauth
  isAuth(req, res, next) {
    const authentication = req.user[0];
    res.status(200).send({ isAuth: true, authentication });
  }

  // [POST] /api/login
  login(req, res, next) {
    const sql = "select * from customerdata where email = ? ";
    const message = "Email hoặc mật khẩu không chính xác!";
    const email = req.body.email;
    const password = req.body.password;

    pool.query(sql, email, function (error, results, fields) {
      if (error) {
        res.send({ message: error });
      } else {
        if (results.length > 0) {
          bcrypt.compare(password, results[0].password, (err, response) => {
            if (response) {
              const payload = {
                iss: "the books umbrella",
                id: results[0].id,
                username: results[0].username,
                authentication: results[0].authentication,
              };
              const token = "Bearer " + encodeToken(payload);

              res.setHeader("isAuth", token);
              res.send({
                checked: true,
                token,
                username: results[0].username,
                authentication: results[0].authentication,
              });
            } else {
              res.status(200).send({ message, checked: false });
            }
          });
        } else {
          res.status(200).send({ message, checked: false });
        }
      }
    });
  }

  // [POST] /api/check/email
  emailCheck(req, res, next) {
    const sql = "select * from customerdata where email = ? ";
    const message = "Email đã tồn tại, vui lòng nhấn 'Quên mật khẩu'!";
    const email = req.body.email;

    pool.query(sql, email, function (error, results, fields) {
      if (error) {
        res.send({ message, checked: false });
      } else {
        if (results.length > 0) {
          res.status(200).send({ message, checked: false });
        } else {
          res.status(200).send({ checked: true });
        }
      }
    });
  }

  // [POST] /api/check/usename
  usernameCheck(req, res, next) {
    const sql = "select * from customerdata where username = ? ";
    const message = "Username đã tồn tại!";
    const username = req.body.username;

    pool.query(sql, username, function (error, results, fields) {
      if (error) {
        res.send({ message, checked: false });
      } else {
        if (results.length > 0) {
          res.status(200).send({ message, checked: false });
        } else {
          res.status(200).send({ checked: true });
        }
      }
    });
  }

  //[GET] /api/products
  getProducts(req, res, next) {
    const selectSql = "select * from ListProducts";

    const message = "Lỗi hệ thống, vui lòng thử lại!";
    pool.query(selectSql, function (error, results, fields) {
      if (error) {
        res.status(200).send({ message, checked: false });
      } else {
        if (results.length > 0) {
          res.send(results);
        } else {
          res.send({ message, checked: false });
        }
      }
    });
  }

  //[GET] /api/products/detail/:id
  getProductById(req, res, next) {
    const id = req.params.id;

    const errorMgs = "Lỗi hệ thống, vui lòng thử lại!";
    const selectSql = "call getProductById(?)";

    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.status(200).send({ message: errorMgs, checked: false });
      } else {
        if (results[0].length > 0) {
          res.send({ results: results[0], checked: true });
        } else {
          res.send({ message: errorMgs, checked: false });
        }
      }
    });
  }

  //[GET] /api/products/search/keywords
  getProductsByKeywords(req, res, next) {
    const keywords = "%" + req.query.keywords + "%";

    const errorMgs = "Lỗi hệ thống, vui lòng thử lại!";
    const nullMgs = "Không tìm thấy sản phẩm nào!";
    const selectSql = "call getProductByKeywords(?)";

    pool.query(selectSql, keywords, function (error, results, fields) {
      if (error) {
        res.status(200).send({ message: errorMgs, checked: false });
      } else {
        if (results[0].length > 0) {
          res.send({ results: results[0], checked: true });
        } else {
          res.send({ message: nullMgs, checked: false });
        }
      }
    });
  }

  //[GET] /api/products/search/genre
  getProductsByGenre(req, res, next) {
    const genre = req.query.genre;

    const errorMgs = "Lỗi hệ thống, vui lòng thử lại!";
    const selectSql = "call getProductsByGenre(?)";

    pool.query(selectSql, genre, function (error, results, fields) {
      if (error) {
        res.status(200).send({ message: errorMgs, checked: false });
      } else {
        if (results[0].length > 0) {
          res.send({ results: results[0], checked: true });
        } else {
          res.send({ message: errorMgs, checked: false });
        }
      }
    });
  }

  //[GET] /api/products/search/price
  getProductsByPrice(req, res, next) {
    const price = req.query.price;

    const errorMgs = "Lỗi hệ thống, vui lòng thử lại!";
    const selectSql = "call getProductsByPrice(?)";

    pool.query(selectSql, price, function (error, results, fields) {
      if (error) {
        res.status(200).send({ message: errorMgs, checked: false });
      } else {
        if (results[0].length > 0) {
          res.send({ results: results[0], checked: true });
        } else {
          res.send({ message: errorMgs, checked: false });
        }
      }
    });
  }

  //[GET] /api/products/search/publisher
  getProductsByPublisher(req, res, next) {
    const publisher = req.query.publisher;

    const errorMgs = "Lỗi hệ thống, vui lòng thử lại!";
    const selectSql = "call getProductsByPublisher(?)";

    pool.query(selectSql, publisher, function (error, results, fields) {
      if (error) {
        res.status(200).send({ message: errorMgs, checked: false });
      } else {
        if (results.length > 0) {
          res.send({ results: results[0], checked: true });
        } else {
          res.send({ message: errorMgs, checked: false });
        }
      }
    });
  }

  //[GET] /api/products/search/form
  getProductsByForm(req, res, next) {
    const form = req.query.form;

    const errorMgs = "Lỗi hệ thống, vui lòng thử lại!";
    const msg = "Có vẻ như không có sản phẩm nào phù hợp!";
    const selectSql = "call getProductsByForm(?)";

    pool.query(selectSql, form, function (error, results, fields) {
      if (error) {
        res.status(200).send({ message: errorMgs, checked: false });
      } else {
        if (results[0].length > 0) {
          res.send({ results: results[0], checked: true });
        } else {
          res.send({ message: msg, checked: false });
        }
      }
    });
  }

  //[GET] /api/products/search/age
  getProductsByAge(req, res, next) {
    const age = req.query.age;

    const errorMgs = "Lỗi hệ thống, vui lòng thử lại!";
    const msg = "Có vẻ như không có sản phẩm nào phù hợp!";
    const selectSql = "call getProductsByAge(?)";

    pool.query(selectSql, age, function (error, results, fields) {
      if (error) {
        res.status(200).send({ message: errorMgs, checked: false });
      } else {
        if (results[0].length > 0) {
          res.send({ results: results[0], checked: true });
        } else {
          res.send({ message: msg, checked: false });
        }
      }
    });
  }

  //[GET] /api/cart
  getCart(req, res, next) {
    const customerId = req.user[0].id;
    const selectSql = "select * from cart where customerId = ?";
    const errorMsg = "Lỗi hệ thống, không thể lấy thông tin giỏ hàng!";
    const successMsg = "Chưa có sản phẩm trong giỏ hàng!";
    pool.query(selectSql, customerId, function (error, results, fields) {
      if (error) {
        res.send({ message: errorMsg });
      } else {
        if (results.length > 0) {
          res.status(200).send({ results });
        } else {
          res.status(200).send({ message: successMsg });
        }
      }
    });
  }

  //[POST] /api/cart/add
  addToCart(req, res, next) {
    const customerId = req.user[0].id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    const insertSql =
      "insert into cart (productId, customerId, quantity) value (?, ? ,?)";
    const errorMsg = "Lỗi hệ thống, không thể thêm sản phẩm vào giỏ hàng!";
    const existMsg = "Sản phẩm đã có sẵn trong giỏ hàng!";
    const successMsg = "Sản phẩm đã được thêm vào giỏ hàng!";

    pool.query(
      insertSql,
      [productId, customerId, quantity],
      function (error, results, fields) {
        if (error) {
          if ((error.errno = 1062)) {
            res.send({ message: existMsg, checked: false });
          } else {
            res.send({ message: errorMsg, checked: false });
          }
        } else {
          if (results) {
            res.status(200).send({ message: successMsg, checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      }
    );
  }

  //[POST] /api/cart/remove
  removeFromCart(req, res, next) {
    const customerId = req.user[0].id;
    const productId = req.body.productId;

    const deleteSql = "delete from cart where customerId = ? and productId = ?";
    const errorMsg = "Lỗi hệ thống, không thể xóa sản phẩm khỏi giỏ hàng!";
    const successMsg = "Sản phẩm đã được xóa khỏi giỏ hàng!";

    pool.query(
      deleteSql,
      [customerId, productId],
      function (error, results, fields) {
        if (error) {
          res.send({ message: errorMsg, checked: false });
        } else {
          if (results) {
            res.status(200).send({ message: successMsg, checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      }
    );
  }
}

module.exports = new API();
