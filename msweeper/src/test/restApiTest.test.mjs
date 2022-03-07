import { assert } from "console";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
// require("dotenv").config({ path: ".env.local" });
import fetch from "node-fetch";
// console.log(process.env.REACT_APP_API_KEY);
// test("Test unauthorized message", async () => {
//   let res = fetch(process.env.REACT_APP_API_URL)
//     .then((res) => console.log(res))
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//       expect(res).toBe({ message: "unauthoriazed" });
//     });
// });

const rank = [
  {
    timeUsed: 999,
    name: "testUser1",
  },

  {
    timeUsed: 999,
    name: "testUser2",
  },

  {
    timeUsed: 999,
    name: "testUser3",
  },

  {
    timeUsed: 999,
    name: "testUser4",
  },

  {
    timeUsed: 999,
    name: "testUser5",
  },
];
async function testAuthorized() {
  const fetchTesting = async () => {
    console.log("asdasd");
    const res = await fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        index: 0,
        mode: "easy",
        rank,
      }),
    });

    console.log("asdasd");
    return res;
  };
  const res = await fetchTesting();
  console.log(res.status);
  const json = await res.json();
  console.log(json);
}

async function testUnAuthorized() {
  let res = fetch(process.env.REACT_APP_API_URL, {
    method: "GET",
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
    },
  })
    .then((res) => {
      assert(res.status === 200);
      return res.json();
    })
    .then((res) => {
      console.log(res);
      assert(res[0].index === 0);
      assert(res[0].mode === "easy");
      assert(res[1].index === 2);
      assert(res[1].mode === "hard");
      assert(res[2].index === 1);
      assert(res[2].mode === "medium");
      // expect(res).toBe({ message: "unauthoriazed" });
    });
}

testAuthorized();
// it("testing fetching database", async () => {
//   let res = fetch(process.env.API_URL).then(res => res.json());

//   let data = res.data;
//   console.log(data);
// });
