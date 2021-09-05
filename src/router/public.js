const { Router } = require("express");

const { hashSync, compareSync } = require("bcryptjs");

const { User } = require("../models");

const router = Router();

router.post("/login", async ({ body: { password, ...rest } }, res, next) => {
  try {
    const user = await User.findOne({
      ...rest,
    });
    if (!user) {
      res.status(401).json({ message: "User not found." });
      return;
    }
    const validUser = compareSync(password, user.password);
    if (!validUser) {
      res.status(401).json({ message: "User not found." });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/register", async ({ body: { password, ...rest } }, res, next) => {
  try {
    const user = await User.create({
      ...rest,
      password: hashSync(password, 12),
    });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.put(
  "/transfer/fund",
  async ({ body: { senderAccount, recieverAccount, fund } }, res) => {
    try {
      await User.findOneAndUpdate(
        { accountNumber: recieverAccount },
        { $inc: { balance: fund } }
      );
      await User.findOneAndUpdate(
        {
          accountNumber: senderAccount,
        },
        { $inc: { balance: -1 * fund } }
      );
      res.status(200).json({ message: "Transaction Successful" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;
