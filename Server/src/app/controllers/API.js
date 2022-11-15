
const pool = require("../models/pool");
const fs = require('fs');
const express = require('express');
const path = require('path');
require('dotenv').config();
const bcrypt = require("bcrypt");
const saltRound = 10;
const encodeToken = require("../../util/encodeToken");
const CronJob = require('cron').CronJob;
const io = require("socket.io-client");
const job = [];
const trading = [];
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': process.env.PP_MODE,
    'client_id': process.env.CLIENT_ID, 
    'client_secret': process.env.PP_SECRET_KEY
});

class API {
    // [POST] /api
    index(req, res, next) {

    }

    // register(req, res, next) {
    //     const insertSql = "insert into taikhoan (Ho, Ten, Email, TenDN, MatKhau) value (?,?,?,?,?)";

    //     const Ho = req.body.Ho;
    //     const Ten = req.body.Ten;
    //     const Email = req.body.Email;
    //     const TenDN = req.body.TenDN;
    //     const MatKhau = req.body.MatKhau;
    //     const CFMatKhau = req.body.CFMatKhau;

    //     if (CFMatKhau !== MatKhau) {
    //         res.status(200).send({ message: "Mật khẩu xác nhận không khớp!" });
    //     } else {
    //         bcrypt.hash(MatKhau, saltRound, (err, hash) => {
    //             if (err) {
    //                 res.status(200).send({ message: "Mật khẩu không được mã hóa" });
    //             }           
    //             pool.query(
    //                 insertSql,
    //                 [Ho, Ten, Email, TenDN, hash],
    //                 function (error, results, fields) {
    //                     if (error) {
    //                         res.send({ message: error.sqlMessage });
    //                     } else {
    //                         res.send(results);
    //                     }
    //                 }
    //             );
    //         });
    //     }
    // }

    // // [GET] /api/isAuth
    // isAuth(req, res, next) {
    //     const PQ = req.user[0].PhanQuyen;
    //     res.status(200).send({ isAuth: true, PQ: PQ });
    // }

    // // [POST] /api/login
    // login(req, res, next) {

    //     const sql = "select * from taikhoan where Email = ? ";
    //     const Email = req.body.Email;
    //     const MatKhau = req.body.MatKhau;

    //     pool.query(sql, Email, function (error, results, fields) {
    //         if (error) {
    //             res.send({ error: error });
    //         }
    //         if (results.length > 0) {
    //             bcrypt.compare(MatKhau, results[0].MatKhau, (err, response) => {
    //                 if (response) {
    //                     const payload = {
    //                         iss: "grey panther auction site",
    //                         idTK: results[0].idTK,
    //                         TenDN: results[0].TenDN,
    //                         PhanQuyen: results[0].PhanQuyen,
    //                     };
    //                     const token = "Bearer " + encodeToken(payload);
    //                     res.setHeader("isAuth", token);

    //                     res.send({ isAuth: response, TenDN: results[0].TenDN, PQ: results[0].PhanQuyen });
    //                 } else {
    //                     res
    //                         .status(200)
    //                         .send({ message: "Tên Đăng Nhập hoặc mật khẩu không đúng!" });
    //                 }
    //             });
    //         } else {
    //             res.status(200).send({ message: "Tài khoản không tồn tại!" });
    //         }
    //     });
    // }
}

module.exports = new API();