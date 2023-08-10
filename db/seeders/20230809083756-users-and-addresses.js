"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    "use strict";
    await queryInterface.bulkInsert("users", [
      {
        user_name: "John",
        first_name: "John",
        last_name: "Tan",
        email: "john@test.com",
        mobile_number: "98416451",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_name: "Jack",
        first_name: "Jack",
        last_name: "Tay",
        email: "Jack@test.com",
        mobile_number: "98765431",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_name: "May",
        first_name: "May",
        last_name: "Lim",
        email: "May@test.com",
        mobile_number: "87654321",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_name: "Jean",
        first_name: "Jean",
        last_name: "Lee",
        email: "Jean@Jean.com",
        mobile_number: "87653432",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_name: "Mandy",
        first_name: "Mandy",
        last_name: "Chong",
        email: "Mandy@test.com",
        mobile_number: "97645123",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_name: "Ben",
        first_name: "Ben",
        last_name: "Foster",
        email: "B_Foster@test.com",
        mobile_number: "97341613",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_name: "Peter",
        first_name: "Peter",
        last_name: "Leong",
        email: "Peter@test.com",
        mobile_number: "87416146",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_name: "porter89",
        first_name: "Patrick",
        last_name: "Tan",
        email: "patrick@test.com",
        mobile_number: "88003456",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_name: "lesterlester",
        first_name: "Corey",
        last_name: "Huang",
        email: "corey@test.com",
        mobile_number: "96720987",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_name: "samsam",
        first_name: "Yew Fong",
        last_name: "Lee",
        email: "yf@test.com",
        mobile_number: "67320987",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("addresses", [
      {
        user_id: 1,
        address: "Blk 457 Sengkang West Ave 2",
        city: "Singapore",
        postal_code: "123457",
        contact_number: "98877889",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        address: "25 Clemenceau Ave",
        city: "Singapore",
        postal_code: "456789",
        contact_number: "98765431",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        address: "Blk 155 Tangjong Pagar Rd #07-129",
        city: "Singapore",
        postal_code: "123155",
        contact_number: "87654321",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        address: "Blk 56 Kallang Pudding Rd #04-433",
        city: "Singapore",
        postal_code: "128056",
        contact_number: "87653432",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        address: "Blk 139 Tampines Road #04-021",
        city: "Singapore",
        postal_code: "567139",
        contact_number: "98754329",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        address: "56 Penang Road #301-21",
        city: "Singapore",
        postal_code: "371056",
        contact_number: "95632108",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        address: "25 Purvis St #01-02",
        city: "Singapore",
        postal_code: "328925",
        contact_number: "309872",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 8,
        address: "828 Tampines Street 81 #01-248",
        city: "Singapore",
        postal_code: "681902",
        contact_number: "589828",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 9,
        address: "43A West Coast Rd #02-66",
        city: "Singapore",
        postal_code: "163243",
        contact_number: "88663098",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 10,
        address: "Blk 10 Petir Rd #03-456",
        city: "Singapore",
        postal_code: "128010",
        contact_number: "88991234",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("addresses", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
