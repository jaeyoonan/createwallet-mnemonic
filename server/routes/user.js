const express = require("express");
const router = express.Router();
const User = require("../models/User");
const lightwallet = require("eth-lightwallet");
const fs = require("fs");

router.post("/user", async (req, res) => {
  // 포스트맨에서 userName, password를 넣으면
  let reqUserName, reqPassword;
  reqUserName = req.body.username;
  reqPassword = req.body.password;
  // user에서 find로 userName을 찾고,
  const user = await User.find({
    userName: reqUserName,
    password: reqPassword,
  });
  const { username, password, createdAt, address, privateKey } = user;
  const created = user.length > 0;

  if (created) {
    // 있으면 있다고 응답
    res.status(409).send("User exists");
    console.log("User exists");
    // 없으면 DB에 저장
  } else {
    // 니모닉코드 생성
    let mnemonic;
    debugger;
    mnemonic = lightwallet.keystore.generateRandomSeed();
    // 생성된 니모닉코드와 password로 keyStore, address 생성
    lightwallet.keystore.createVault(
      {
        password: reqPassword,
        seedPhrase: mnemonic,
        hdPathString: "m/0'/0'/0'",
      },
      function (err, ks) {
        ks.keyFromPassword(reqPassword, function (err, pwDerivedKey) {
          ks.generateNewAddress(pwDerivedKey, 1);
          let address = ks.getAddresses().toString();
          let keyStore = ks.serialize();
          new User({
            userName: reqUserName,
            password: reqPassword,
            address: address,
            privateKey: mnemonic,
          })
            .save()
            .then((result) => {
              res.json(address);
            })
            .catch((err) => {
              console.error(err);
            });
        });
      }
    );
  }
});

module.exports = router;
