const db = require("../models/db");

exports.card_check = async (req, res) => {
  const {
    number,
    month,
    year,
    cvc,
    user_id,
    order_id,
    payment_amount,
    payment_method,
    cardname,
  } = req.body;
  try {
    const checkcard = `select * from bank_cards WHERE number = $1 AND month = $2 AND year = $3 AND cvc = $4`;
    const checked = await db.query(checkcard, [number, month, year, cvc]);
    if (!checked.rows.length) {
      res.status(400).json({ error: "Invalid Card Data" });
    } else {
      const card = checked.rows[0];
      const payment_time = new Date();
      const payment_status = "approved";
      //   console.log(card.balance);

      if (payment_amount > card.balance) {
        res.status(400).json({ error: "Insufficient balance" });
      } else {
        const query = `INSERT INTO payments (user_id, order_id, payment_amount, payment_status, payment_method
            , payment_time, card_id, cardname)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
              RETURNING payment_id`;
        const values = [
          user_id,
          order_id,
          payment_amount,
          payment_status,
          payment_method,
          payment_time,
          checked.rows[0].card_id,
          cardname,
        ];
        await db.query(query, values);
        const updateBalanceQuery = `UPDATE bank_cards
        SET balance = balance - $1
        WHERE card_id = $2`;
        const updateBalanceValues = [payment_amount, checked.rows[0].card_id];

        await db.query(updateBalanceQuery, updateBalanceValues);

        res.status(200).json({
          message: "card added Successfully",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to Check");
  }
};
// ----------------------------------------------------------------------------------------
exports.paymentdata = async (req, res) => {
  try {
    const pay = await db.query(
      `select * from payments `
      //   where payment_status = 'pending'
    );
    res.json(pay.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
// ----------------------------------------------------------------------------------------------
