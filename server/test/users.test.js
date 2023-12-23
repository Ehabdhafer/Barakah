const db = require("../models/db");
const donationmodel = require("../models/donation_model");

jest.mock("../models/db.js", () => ({
  query: jest.fn(),
}));
describe("donationmodel", () => {
  describe("getadminDonation", () => {
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn(() => res);
      res.json = jest.fn(() => res);
      return res;
    };
    it("should return pending donations without deleted ones", async () => {
      const mockQueryResult = {
        rows: [
          {
            type: "Fish",
            details: "frozen seafood",
            city: "Jerash",
            date: "2023-11-30T21:00:00.000Z",
            time: "17:47:34",
            expiry_date: null,
            price: "0.00",
            user_id: 6,
            qty: 15,
            is_deleted: false,
            free: true,
            expired: true,
            additionalnotes: "nothing",
            imageurl:
              "https://firebasestorage.googleapis.com/v0/b/barakah-f6a23.appspot.com/o/1701442053614_d8c207e70ba7d30682d10ffc74bd69ff.jpg?alt=media",
            status: "pending",
            username: "alia ibraheem",
            email: "alia@gmail.com",
            password:
              "$2b$10$qfL88QSlRogLM2R/bdOh8OaxN.WnlumidWDN/Fq.lq2a.B.YWEiutS",
            phone: "0793208705",
            subscription: true,
            role_id: 3,
            created_at: "2023-11-07T20:44:45.640Z",
            industry: "Supermarket",
          },
        ],
      };
      db.query.mockResolvedValue(mockQueryResult);

      const result = await donationmodel.getadminDonation();

      expect(db.query).toHaveBeenCalledWith(expect.any(String));
      expect(result).toEqual(mockQueryResult.rows);
    });

    it("should handle errors and return a 500 status", async () => {
      const dbModule = require("../models/db");
      if (
        dbModule.someObject &&
        typeof dbModule.someObject.find === "function"
      ) {
        jest
          .spyOn(dbModule.someObject, "find")
          .mockRejectedValue(new Error("Mocked database error"));

        const req = {};
        const res = mockResponse();

        await db(req, res);

        expect(dbModule.someObject.find).toHaveBeenCalledWith({
          is_deleted: false,
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          message: "Internal Server Error",
        });
      } else {
        console.error(
          "Could not find someObject or its find method in dbModule"
        );
      }
    });
  });
});
