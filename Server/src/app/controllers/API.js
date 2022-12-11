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
        const insertSql = "insert into customerdata (email, username, password) value (?,?,?)";
        const errorMsg = "Đã có lỗi xảy ra, vui lòng thử lại!";
        const successMsg = "Tài khoản đã đăng kí thành công!";
        const email = req.body.email;
        const username = req.body.userName;
        const password = req.body.passWord;

        bcrypt.hash(password, saltRound, (err, hash) => {
            if (err) {
                res.status(200).send({ message: errorMsg });
            } else {           
                pool.query(
                    insertSql,
                    [email, username, hash],
                    function (error, results, fields) {
                        if (error) {
                            res.send({ message: errorMsg });
                        } else {
                            res.send({ message: successMsg });
                        }
                    }
                );
            }
        });
    }
 // [GET] /api/isauth
    isAuth(req, res, next) {
        const authentication = req.user[0].authentication;
        res.status(200).send({ isAuth: true, authentication});
    }

    // [POST] /api/login
    login(req, res, next) {
 
        const sql = "select * from customerdata where email = ? ";
        const message = "Email hoặc mật khẩu không chính xác!";
        const email = req.body.email;
        const password = req.body.passWord;
        
        pool.query(sql, email, function (error, results, fields) {
            if (error) {
                res.send({ message: error });
            } 
            else {
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
                                username: results[0].username, 
                                authentication: results[0].authentication 
                            });
                        } else {
                            res.status(200).send({ message });
                        }
                    });
                } else {
                    res.status(200).send({ message });
                }
            }
        });
    }

    // [POST] /api/check/email
    emailCheck(req, res, next) {
        const sql = "select * from customerdata where email = ? ";
        const message = "Email đã tồn tại, vui lòng nhấn \'Quên mật khẩu\'!";
        const email = req.body.email;
        
        pool.query(sql, email, function (error, results, fields) {
            if (error) {
                res.send({ message, checked: false });
            } 
            else {
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
        const message = 'Username đã tồn tại!';
        const username = req.body.userName;
        
        pool.query(sql, username, function (error, results, fields) {
            if (error) {
                res.send({ message, checked: false });
            } 
            else {
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
