const pool = require("../models/pool");
const fs = require("fs");
const express = require("express");
const path = require("path");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRound = 9;
const encodeToken = require("../../util/encodeToken");
const createError = require("http-errors");
const myOAuth2Client = require("../../app/configs/oauth2client");
const nodemailer = require("nodemailer");
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
    const auth = req.user[0];
    if (auth) {
      res.status(200).send({ authentication: auth });
    } else {
      return next(createError(401));
    }
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

              //res.setHeader("isAuth", token);
              res.send({
                checked: true,
                token,
                id: results[0].id,
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

  // [PATCH] /api/update/password
  updatePassword(req, res, next) {
    const id = req.user[0].id;
    const updateSql = "update customerdata set password = ? where id = ?";
    const selectSql = "select password from customerdata where id = ?";
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    pool.getConnection(function (err, connection) {
      //if (err) throw err; // not connected!
      connection.query(selectSql, id, function (error, results, fields) {
        if (error) {
          res.send({ message: "Kết nối DataBase thất bại", checked: false });
        }
        if (results.length > 0) {
          bcrypt.compare(password, results[0].password, (err, response) => {
            if (response) {
              bcrypt.hash(newPassword, saltRound, (err, hash) => {
                connection.query(
                  updateSql,
                  [hash, id],
                  function (err, results, fields) {
                    if (err) {
                      res
                        .status(200)
                        .send({ message: err.sqlMessage, checked: false });
                    } else {
                      res.send({
                        message: "Đổi mật khẩu thành công!",
                        checked: true,
                      });
                    }
                  }
                );
              });
            } else {
              res
                .status(200)
                .send({ message: "Mật khẩu cũ không đúng!", checked: false });
            }
          });
        } else {
          res
            .status(200)
            .send({ message: "Kết nối DataBase thất bại", checked: false });
        }
      });
      connection.release();
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
          res.send({ results, checked: true });
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
    const emptyMgs = "Không tìm thấy thông tin sản phẩm!";
    const selectSql = "call getProductById(?)";

    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.status(200).send({ message: errorMgs, checked: false });
      } else {
        if (results[0].length > 0) {
          res.send({ results: results[0], checked: true });
        } else {
          res.send({ message: emptyMgs, checked: false });
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
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    const errorMgs = "Lỗi hệ thống, vui lòng thử lại!";
    const selectSql = "call getProductsByPrice(?,?)";

    pool.query(
      selectSql,
      [minPrice, maxPrice],
      function (error, results, fields) {
        if (error) {
          res.status(200).send({ message: errorMgs, checked: false });
        } else {
          if (results[0].length > 0) {
            res.send({ results: results[0], checked: true });
          } else {
            res.send({ message: errorMgs, checked: false });
          }
        }
      }
    );
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
    const selectSql = "call getCart(?)";
    const errorMsg = "Lỗi hệ thống, không thể lấy thông tin giỏ hàng!";
    const nullMgs = "Chưa có sản phẩm trong giỏ hàng!";
    pool.query(selectSql, customerId, function (error, results, fields) {
      if (error) {
        res.send({ message: errorMsg });
      } else {
        if (results[0].length > 0) {
          res.status(200).send({ results: results[0] });
        } else {
          res.status(200).send({ message: nullMgs });
        }
      }
    });
  }

  //[POST] /api/cart/add
  addToCart(req, res, next) {
    const customerId = req.user[0].id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    const checkSql = "call checkQuantity(?)";
    const insertSql =
      "insert into cart (productId, customerId, quantity) value (?, ? ,?)";
    const errorMsg = "Lỗi hệ thống, không thể thêm sản phẩm vào giỏ hàng!";
    const existMsg = "Sản phẩm đã có sẵn trong giỏ hàng!";
    const successMsg = "Sản phẩm đã được thêm vào giỏ hàng!";
    const checkMsg = "Số lượng sản phẩm phải bé hơn ";

    pool.query(checkSql, productId, function (error, results, fields) {
      if (error) {
        res.send({ message: "0", checked: false });
      } else {
        if (results[0].length > 0) {
          if (results[0][0].quantity < quantity) {
            res.status(200).send({
              message: checkMsg + results[0][0].quantity,
              checked: false,
            });
          } else {
            pool.query(
              insertSql,
              [productId, customerId, quantity],
              function (error, results, fields) {
                if (error) {
                  if ((error.errno = 1062)) {
                    res.send({ duplicate: true });
                  } else {
                    res.send({ message: "1", checked: false });
                  }
                } else {
                  if (results) {
                    res.status(200).send({ message: "2", checked: true });
                  } else {
                    res.status(200).send({ message: "3", checked: false });
                  }
                }
              }
            );
          }
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[DELETE] /api/cart/remove
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

  //[PATCH] /api/cart/update
  updateCart(req, res, next) {
    const customerId = req.user[0].id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    if (quantity <= 0) {
      quantity = 1;
    }
    const checkSql = "call checkQuantity(?)";
    const updateSql =
      "update cart set quantity = ? where customerId = ? and productId = ?";
    const errorMsg = "Đã có lỗi xảy ra, vui lòng thử lại!";
    const checkMsg = "Số lượng sản phẩm phải bé hơn ";

    pool.query(checkSql, productId, function (error, results, fields) {
      if (error) {
        res.send({ message: errorMsg, checked: false });
      } else {
        if (results[0].length > 0) {
          if (results[0][0].quantity < quantity) {
            res.status(200).send({
              message: checkMsg + results[0][0].quantity,
              checked: false,
            });
          } else {
            pool.query(
              updateSql,
              [quantity, customerId, productId],
              function (error, results, fields) {
                if (error) {
                  res.send({ message: errorMsg, checked: false });
                } else {
                  if (results) {
                    res.status(200).send({ checked: true });
                  } else {
                    res.status(200).send({ message: errorMsg, checked: false });
                  }
                }
              }
            );
          }
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [POST] /api/cart/order
  createOrder(req, res, next) {
    const quantity = req.body.quantity;
    const customerId = req.user[0].id;
    const productId = req.body.productId;
    if (quantity <= 0) {
      quantity = 1;
    }
    const price = req.body.price * quantity;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    let deliveryMethod = req.body.deliveryMethod;
    if (deliveryMethod === "fast") {
      deliveryMethod = 1;
    } else {
      deliveryMethod = 2;
    }

    let paymentMethod = req.body.paymentMethod;
    if (paymentMethod === "bank") {
      paymentMethod = 2;
    } else {
      paymentMethod = 1;
    }
    const timeOfOrder = new Date(Date.now());
    const discount = req.body.voucher ? req.body.voucher : 1;

    const insertSql =
      "insert into orders " +
      "(productId, customerId, quantity, price, fullname, email, phone, address, deliveryMethod, paymentMethod, timeOfOrder, discount) " +
      "value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    pool.query(
      insertSql,
      [
        productId,
        customerId,
        quantity,
        price,
        fullname,
        email,
        phone,
        address,
        deliveryMethod,
        paymentMethod,
        timeOfOrder,
        discount,
      ],
      function (error, results, fields) {
        if (error) {
          res.send({ checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ checked: false });
          }
        }
      }
    );
  }

  //[GET] /api/profile
  getProfile(req, res, next) {
    const customerId = req.user[0].id;

    const selectSql = "select * from customerdata where id = ?";
    const errorMsg = "Lỗi hệ thống, không thể lấy thông tin khách hàng!";

    pool.query(selectSql, customerId, function (error, results, fields) {
      if (error) {
        res.send({ message: errorMsg });
      } else {
        if (results.length > 0) {
          res.status(200).send({ results: results });
        } else {
          res.status(200).send({ message: errorMsg });
        }
      }
    });
  }

  //[PATCH] /api/profile/update
  updateProfile(req, res, next) {
    const customerId = req.user[0].id;
    const fullname = req.body.fullname ? req.body.fullname : null;
    const birthdate = req.body.birthdate ? req.body.birthdate : null;
    const phone = req.body.phone ? req.body.phone : null;
    const address = req.body.address ? req.body.address : null;
    let avatar = req.file ? req.file.path : null;
    console.log(avatar);

    const updateSql =
      "update customerdata set fullname = ?, birthdate = ?, phone = ?, address = ?, avatar = ? where id = ?";
    const errorMsg = "Lỗi hệ thống, không thể cập nhật thông tin khách hàng!";

    pool.query(
      updateSql,
      [fullname, birthdate, phone, address, avatar, customerId],
      function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      }
    );
  }

  //[POST] /api/payment/paypal
  paymentByPaypal(req, res, next) {
    const customerId = req.user[0].id;
    const totalPrice = +(Math.round(req.body.totalPrice + "e+4") + "e-4"); // làm tròn số tiền 4 số sau dấu thập phân
    const listProduct = req.body.listProduct;
    const quantity = req.body.quantity;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url:
          process.env.return_url +
          `/api/paymentsuccess?id=${customerId}&totalprice=${totalPrice}`,
        cancel_url:
          process.env.return_url + `/api/paymentfailed?id=${customerId}`,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: listProduct,
                sku: "Gồm " + quantity + " sản phẩm",
                price: totalPrice,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: totalPrice,
          },
          description: "Giao dịch mua hàng từ TheBooksUmbrella",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        res.send({ message: "Có lỗi, vui lòng thử lại sau" });
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.send({ payment_link: payment.links[i].href });
          }
        }
      }
    });
  }

  //[GET] /api/paymentsuccess?id=${customerId}&totalprice=${totalPrice}`
  paymentSuccess(req, res) {
    const customerId = req.query.id;

    const totalPrice = req.query.totalprice;
    const updateSql =
      "update orders set pay = 2 where customerId = ? and deliveryMethod = 2 and status = 1 and pay = 1";

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const excute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: totalPrice,
          },
        },
      ],
    };
    paypal.payment.execute(
      paymentId,
      excute_payment_json,
      function (error, payment) {
        if (error) {
          res.redirect(process.env.cancel_url + `/cart?payment=true`);
        } else {
          pool.query(updateSql, customerId);
          res.redirect(process.env.cancel_url + `/cart?payment=false`);
        }
      }
    );
  }

  //[GET] /api/paymentfailes?id=${customerId}`
  paymentFailed(req, res) {
    const customerId = req.query.id;

    const updateSql =
      "update orders set status = 4 where customerId = ? and deliveryMethod = 2 and status = 1 and pay = 1";

    pool.query(updateSql, customerId, function (error, results, fields) {
      res.redirect(process.env.cancel_url + `/cart?payment=true`);
    });
  }

  //[GET] /api/admin/warehouse
  getWarehouse(req, res, next) {
    const auth = req.user[0].authentication;
    const selectSql = "select * from ListAllProducts";
    const message = "Lỗi hệ thống, vui lòng thử lại!";

    if (auth !== 1) {
      return next(createError(401));
    } else {
      pool.query(selectSql, function (error, results, fields) {
        if (error) {
          res.status(200).send({ message, checked: false });
        } else {
          if (results.length > 0) {
            res.send({ results, checked: true });
          } else {
            res.send({ message, checked: false });
          }
        }
      });
    }
  }

  //[POST] /api/admin/product/create
  createProduct(req, res, next) {
    const auth = req.user[0].authentication;
    const productName = req.body.productName;
    const chapter = req.body.chapter ? req.body.chapter : null;
    const author = req.body.author;
    const translator = req.body.translator ? req.body.translator : null;
    const price = req.body.price;
    const publisher = req.body.publisher;
    const publicationDate = req.body.publicationDate;
    const age = req.body.age;
    const packagingSize = req.body.packagingSize;
    const form = req.body.form;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const status = req.body.status;
    const genre = req.body.genre;

    const insertSql =
      "call createProduct(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const errorMsg = "Lỗi hệ thống, không thể thêm sản phẩm vào kho hàng!";
    const existMsg = "Sản phẩm đã có sẵn trong kho hàng!";
    const successMsg = "Sản phẩm đã được thêm vào kho hàng!";

    if (auth !== 1) {
      return next(createError(401));
    } else if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    } else {
      const img = req.file.path;
      pool.query(
        insertSql,
        [
          img,
          productName,
          chapter,
          author,
          translator,
          price,
          publisher,
          publicationDate,
          age,
          genre,
          packagingSize,
          form,
          quantity,
          description,
          status,
        ],
        function (error, results, fields) {
          if (error) {
            if ((error.errno = 1062)) {
              res.send({ message: existMsg, checked: false });
            } else {
              res.send({ message: errorMsg, checked: false });
            }
          } else {
            if (results) {
              res.send({ message: successMsg, checked: true });
            } else {
              res.status(200).send({ message: errorMsg, checked: false });
            }
          }
        }
      );
    }
  }

  //[PATCH] /api/admin/product/update
  updateProduct(req, res, next) {
    const auth = req.user[0].authentication;
    const productId = req.body.productId;

    const image = req.body.image;
    const productName = req.body.productName;
    const chapter = req.body.chapter ? req.body.chapter : null;
    const author = req.body.author;
    const translator = req.body.translator ? req.body.translator : null;
    const price = req.body.price;
    const publisher = req.body.publisher;
    const publicationDate = req.body.publicationDate;
    const age = req.body.age;
    const packagingSize = req.body.packagingSize;
    const form = req.body.form;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const status = req.body.status;
    const genre = req.body.genre;

    const updateSql =
      "update product set image = ?, productName = ?, chapter = ?, author = ?, translator = ?, price = ?, publisher = ?, " +
      "publicationDate = ?, age = ?, packagingSize = ?, form = ?, quantity = ?, description = ?, status = ? where id = ?";

    const errorMsg = "Lỗi hệ thống, không thể chỉnh sửa sản phẩm vào lúc này!";
    const successMsg = "Sản phẩm đã được chỉnh sửa!";

    if (auth !== 1) {
      return next(createError(401));
    } else {
      pool.query(
        updateSql,
        [
          image,
          productName,
          chapter,
          author,
          translator,
          price,
          publisher,
          publicationDate,
          age,
          packagingSize,
          form,
          quantity,
          description,
          status,
          productId,
        ],
        function (error, results, fields) {
          if (error) {
            res.send({ message: errorMsg, checked: false });
          } else {
            if (results) {
              res.send({ message: successMsg, checked: true });
            } else {
              res.status(200).send({ message: errorMsg, checked: false });
            }
          }
        }
      );
    }
  }

  //[PATCH] /api/admin/product/status
  changeProductStatus(req, res, next) {
    const auth = req.user[0].authentication;
    const productId = req.body.productId;
    const status = req.body.status;
    let successMsg = "Sản phẩm đã được đưa vào kho!";

    let newStatus = 1;
    if (status === 1) {
      newStatus = 2;
      successMsg = "Sản phẩm đã được đưa lên website!";
    }

    const updateSql = "update product set status = ? where id = ?";
    const errorMsg =
      "Lỗi hệ thống, không thể chuyển đổi trạng thái vào lúc này. Vui lòng thử lại sau!";

    if (auth !== 1) {
      return next(createError(401));
    } else {
      pool.query(
        updateSql,
        [newStatus, productId],
        function (error, results, fields) {
          if (error) {
            res.send({ message: errorMsg, checked: false });
          } else {
            if (results) {
              res.send({ message: successMsg, checked: true });
            } else {
              res.status(200).send({ message: errorMsg, checked: false });
            }
          }
        }
      );
    }
  }

  //[GET] /api/admin/customer
  getCustomer(req, res, next) {
    const auth = req.user[0].authentication;
    const selectSql = "select * from ListAllCustomers";
    const message = "Lỗi hệ thống, vui lòng thử lại!";

    if (auth !== 1) {
      return next(createError(401));
    } else {
      pool.query(selectSql, function (error, results, fields) {
        if (error) {
          res.status(200).send({ message, checked: false });
        } else {
          if (results.length > 0) {
            res.send({ results, checked: true });
          } else {
            res.send({ message, checked: false });
          }
        }
      });
    }
  }

  //[GET] /api/admin/customer/:id
  getCustomerById(req, res, next) {
    const auth = req.user[0].authentication;
    const customerId = req.params.id;

    const selectSql = "select * from ListAllCustomers where id = ?";
    const errorMsg = "Lỗi hệ thống, vui lòng thử lại!";

    if (auth !== 1) {
      return next(createError(401));
    } else {
      pool.query(selectSql, customerId, function (error, results, fields) {
        if (error) {
          res.status(200).send({ errorMsg, checked: false });
        } else {
          if (results.length > 0) {
            res.send({ results, checked: true });
          } else {
            res.send({ errorMsg, checked: false });
          }
        }
      });
    }
  }

  //[PATCH] /api/admin/customer/update/password
  updateCustomerPassword(req, res, next) {
    const auth = req.user[0].authentication;
    const customerId = req.body.customerId;
    const newPassword = req.body.password;

    const updateSql = "update customerdata set password = ? where id = ?";
    const errorMsg = "Lỗi hệ thống, vui lòng thử lại!";
    const successMsg =
      "Đổi password cho người dùng " + customerId + " thành công!";

    if (auth !== 1) {
      return next(createError(401));
    } else {
      bcrypt.hash(newPassword, saltRound, (err, hash) => {
        if (err) {
          res.status(200).send({ message: errorMsg, checked: false });
        } else {
          pool.query(
            updateSql,
            [hash, customerId],
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
  }

  //[GET] /api/admin/order
  getOrder(req, res, next) {
    const auth = req.user[0].authentication;

    const selectSql = "select * from ListAllOrders";
    const errorMsg = "Lỗi hệ thống, vui lòng thử lại sau!";
    const existMsg = "Chưa có đơn hàng nào!";

    if (auth !== 1) {
      return next(createError(401));
    } else {
      pool.query(selectSql, function (error, results, fields) {
        if (error) {
          res.send({ message: errorMsg, checked: false });
        } else {
          if (results.length > 0) {
            res.status(200).send({ results, checked: true });
          } else {
            res.status(200).send({ message: existMsg, checked: false });
          }
        }
      });
    }
  }

  //[PATCH] /api/admin/order/status
  changeOrderStatus(req, res, next) {
    const auth = req.user[0].authentication;
    const orderId = req.body.orderId;
    const status = req.body.status;
    const info = "Giao dịch được thực thi tự động";

    const selectSql = "select * from ListAllOrders where id = ?";
    const updateSql = "update orders set status = ? where id = ?";
    const insertSql =
      "insert into transaction (orderId, productId, customerId, timeOfPurchase, price, amount, transactionInfor) values (?, ?, ?, ?, ?, ?, ?)";
    const errorMsg =
      "Lỗi hệ thống, không thể chuyển đổi trạng thái vào lúc này. Vui lòng thử lại sau!";

    if (auth !== 1) {
      return next(createError(401));
    } else {
      pool.getConnection(function (err, connection) {
        if (status == "3") {
          connection.query(selectSql, orderId, function (err, rs, fields) {
            if (!err) {
              if (rs.length > 0) {
                const timeOfPurchase = new Date(Date.now());
                connection.query(
                  insertSql,
                  [
                    orderId,
                    rs[0].productId,
                    rs[0].customerId,
                    timeOfPurchase,
                    rs[0].price,
                    rs[0].quantity,
                    info,
                  ],
                  function (e, r, fields) {
                    if (e) {
                    } else {
                      if (r) {
                        connection.query(
                          updateSql,
                          [status, orderId],
                          function (error, results, fields) {
                            if (error) {
                              res.send({ message: errorMsg, checked: false });
                            } else {
                              if (results) {
                                res.send({ checked: true, createTran: true });
                              } else {
                                res
                                  .status(200)
                                  .send({ message: errorMsg, checked: false });
                              }
                            }
                          }
                        );
                      }
                    }
                  }
                );
              }
            }
          });
        } else {
          connection.query(
            updateSql,
            [status, orderId],
            function (error, results, fields) {
              if (error) {
                res.send({ message: errorMsg, checked: false });
              } else {
                if (results) {
                  res.send({ checked: true });
                } else {
                  res.status(200).send({ message: errorMsg, checked: false });
                }
              }
            }
          );
        }
        connection.release();
      });
    }
  }

  //[DELETE] /api/admin/order/delete
  deleteOrder(req, res) {
    const auth = req.user[0].authentication;
    const orderId = req.body.orderId;

    const deleteSql = "delete from orders where id = ? ";
    const successMsg = "Xóa đơn hàng thành công!";
    const errorMsg = "Lỗi hệ thống, vui lòng thử lại sau!";

    if (auth !== 1) {
      return next(createError(401));
    } else {
      pool.query(deleteSql, orderId, function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        } else {
          if (results) {
            res.status(200).send({ message: successMsg, checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }

  //[POST] /api/admin/transaction/create
  createTransaction(req, res, next) {
    const auth = req.user[0].authentication;
    const orderId = req.body.orderId;
    const productId = req.body.productId;
    const customerId = req.body.customerId;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const info = req.body.info;
    const timeOfPurchase = new Date(Date.now());

    const insertSql =
      "insert into transaction (orderId, productId, customerId, timeOfPurchase, price, amount, transactionInfor) values (?, ?, ?, ?, ?, ?, ?)";
    const errorMsg =
      "Lỗi hệ thống, không thể tạo giao dịch. Vui lòng thử lại sau!";
    const successMsg = "Tạo giao dịch thành công!";

    if (auth !== 1) {
      return next(createError(401));
    } else {
      pool.query(
        insertSql,
        [orderId, productId, customerId, timeOfPurchase, price, quantity, info],
        function (err, results, fields) {
          if (err) {
            res.send({ checked: false, message: errorMsg });
          } else {
            if (results) {
              res.send({ checked: true, message: successMsg });
            }
          }
        }
      );
    }
  }

  //[POST] /api/email/send
  async sendEmail(req, res) {
    try {
      // Lấy thông tin gửi lên từ client qua body
      const { email, subject, content } = req.body;
      if (!email || !subject || !content)
        throw new Error("Please provide email, subject and content!");
      /**
       * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
       * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
       */
      const myAccessTokenObject = await myOAuth2Client.getAccessToken();
      // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
      const myAccessToken = myAccessTokenObject?.token;
      // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.ADMIN_EMAIL_ADDRESS,
          clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
          clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
          refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
          accessToken: myAccessToken,
        },
      });
      // mailOption là những thông tin gửi từ phía client lên thông qua API
      const mailOptions = {
        to: email,
        subject: subject, // Tiêu đề email
        html: `<h3>${content}</h3>`, // Nội dung email
      };
      // Gọi hành động gửi email
      await transport.sendMail(mailOptions);
      // Không có lỗi gì thì trả về success
      res
        .status(200)
        .json({ message: "Đã gửi mail về hộp thư. Vui lòng kiểm tra!" });
    } catch (error) {
      // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client

      res.status(500).json({ errors: error.message });
    }
  }
}

module.exports = new API();
