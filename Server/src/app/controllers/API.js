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
      "insert into customerdata (lastname, firstname, email, username, password) value (?,?,?,?,?)";

    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRound, (err, hash) => {
      if (err) {
        res.status(200).send({ message: "Mật khẩu không được mã hóa" });
      } else {
        pool.query(
          insertSql,
          [lastname, firstname, email, username, hash],
          function (error, results, fields) {
            if (error) {
              res.send({ message: error.sqlMessage });
            } else {
              res.send(results);
            }
          }
        );
      }
    });
  }

  // [GET] /api/isAuth
  isAuth(req, res, next) {
    const authentication = req.user[0].authentication;
    res.status(200).send({ isAuth: true, authentication });
  }

  // [POST] /api/login
  login(req, res, next) {
    const sql = "select * from customerdata where username = ? ";
    const username = req.body.userName;
    const password = req.body.passWord;

    pool.query(sql, username, function (error, results, fields) {
      if (error) {
        res.send({ error: error });
      }
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
              token,
              checkPW: response,
              username: results[0].username,
              authentication: results[0].authentication,
            });
          } else {
            res
              .status(200)
              .send({ message: "Tên Đăng Nhập hoặc mật khẩu không đúng!" });
          }
        });
      } else {
        res
          .status(200)
          .send({ message: "Tên Đăng Nhập hoặc mật khẩu không đúng!" });
      }
    });
  }

  //[GET] /api/products
  getProducts(req, res, next) {
    const selectSql = "select * from product";

    pool.query(selectSql, function (err, results, fields) {
      if (err) {
        res.status(200).send({ message: "Kết nối DataBase thất bại" });
      } else {
        if (results) {
          res.send(results);
        } else {
          res.send({ message: "Không thể lấy dữ liệu" });
        }
      }
    });
    //}
  }
}

module.exports = new API();
