const express = require("express");
const api = require("../app/controllers/API");
const router = express.Router();
const passport = require("passport");
const PassportCheck = passport.authenticate("jwt", { session: false });
const fileUploader = require('../app/middleware/cloudinary-upload.js');

// guest
router.post("/register", api.register);
router.post("/login", api.login);
router.post("/check/email", api.emailCheck);
router.post("/check/username", api.usernameCheck);
router.patch("/update/password", PassportCheck, api.updatePassword);

router.get("/isauth", PassportCheck, api.isAuth);

// product
router.get("/products", api.getProducts);
router.get("/products/detail/:id", api.getProductById);
router.get("/products/search/keywords", api.getProductsByKeywords);
router.get("/products/search/genre", api.getProductsByGenre);
router.get("/products/search/price", api.getProductsByPrice);
router.get("/products/search/publisher", api.getProductsByPublisher);
router.get("/products/search/age", api.getProductsByAge);
router.get("/products/search/form", api.getProductsByForm);

// cart
router.get('/cart', PassportCheck, api.getCart);
router.post('/cart/add', PassportCheck, api.addToCart);
router.delete('/cart/remove', PassportCheck, api.removeFromCart);
router.patch('/cart/update', PassportCheck, api.updateCart);
router.post('/cart/order', PassportCheck, api.createOrder);

// profile
router.get("/profile", PassportCheck, api.getProfile);
router.patch("/profile/update", PassportCheck, fileUploader.single('avatar'), api.updateProfile);

// payment
router.post('/payment/paypal', PassportCheck, api.paymentByPaypal);
router.get('/paymentsuccess', api.paymentSuccess);
router.get('/paymentfailed', api.paymentFailed);

//admin - product
router.get("/admin/warehouse", PassportCheck, api.getWarehouse);
router.post("/admin/product/create", PassportCheck, fileUploader.single('image'), api.createProduct);
router.patch("/admin/product/update", PassportCheck, api.updateProduct);
router.patch("/admin/product/status", PassportCheck, api.changeProductStatus);

//admin - customer
router.get("/admin/customer", PassportCheck, api.getCustomer);
router.get("/admin/customer/:id", PassportCheck, api.getCustomerById);
router.patch("/admin/customer/update/password", PassportCheck, api.updateCustomerPassword);

//admin - order
router.get('/admin/order', PassportCheck, api.getOrder);
router.patch("/admin/order/status", PassportCheck, api.changeOrderStatus);
router.delete('/admin/order/delete', PassportCheck, api.deleteOrder);

//admin - transaction
router.post("/admin/transaction/create", PassportCheck, api.createTransaction);


// Tạo API /email/send với method POST
app.post('/email/send', async (req, res) => {
    try {
      // Lấy thông tin gửi lên từ client qua body
      const { email, subject, content } = req.body
      if (!email || !subject || !content) throw new Error('Please provide email, subject and content!')
      /**
       * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
       * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
       */
      const myAccessTokenObject = await myOAuth2Client.getAccessToken()
      // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
      const myAccessToken = myAccessTokenObject?.token
      // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: ADMIN_EMAIL_ADDRESS,
          clientId: GOOGLE_MAILER_CLIENT_ID,
          clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
          refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
          accessToken: myAccessToken
        }
      })
      // mailOption là những thông tin gửi từ phía client lên thông qua API
      const mailOptions = {
        to: email, // Gửi đến ai?
        subject: subject, // Tiêu đề email
        html: `<h3>${content}</h3>` // Nội dung email
      }
      // Gọi hành động gửi email
      await transport.sendMail(mailOptions)
      // Không có lỗi gì thì trả về success
      res.status(200).json({ message: 'Email sent successfully.' })
    } catch (error) {
      // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
      console.log(error)
      res.status(500).json({ errors: error.message })
    }
  })

module.exports = router;
