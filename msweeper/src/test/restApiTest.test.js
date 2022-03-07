// import "dotenv/config";
require("dotenv").config({ path: ".env.local" });
// import fetch from "node-fetch";
// test("Test authorized message", () => {
//   let res = fetch(process.env.REACT_APP_API_URL, {
//     method: "GET",
//     headers: {
//       Authorization: process.env.REACT_APP_API_KEY,
//     },
//   }).then(res => console.log(res))
// });

test("test unauthorized get", async () => {
  const fetchTesting = async () => {
    const res = await fetch(process.env.REACT_APP_API_URL);

    return res;
  };
  const res = await fetchTesting();
  expect(res.status).toBe(403);
  const json = await res.json();
  expect(json).toMatchObject({ message: "unauthorized" });
});

test("test authorized get", async () => {
  const fetchTesting = async () => {
    const res = await fetch(process.env.REACT_APP_API_URL, {
      method: "GET",
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    });

    return res;
  };
  const res = await fetchTesting();
  expect(res.status).toBe(200);
  const leaderboard = await res.json();
  expect(leaderboard).toHaveLength(3);
  expect(leaderboard[0]).toHaveProperty("index");
  expect(leaderboard[0]).toHaveProperty("mode");
  expect(leaderboard[0]).toHaveProperty("rank");
});

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

test("test unauthorized post", async () => {
  const fetchTesting = async () => {
    const res = await fetch(process.env.REACT_APP_API_URL, {
      method: "POST",
      headers: {
        // Authorization: process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        index: 0,
        mode: "easy",
        rank,
      }),
    });

    return res;
  };
  const res = await fetchTesting();
  expect(res.status).toBe(403);
  const json = await res.json();
  expect(json).toMatchObject({ message: "unauthorized" });
});

test("test authorized post", async () => {
  const getTesting = async () => {
    const res = await fetch(process.env.REACT_APP_API_URL, {
      method: "GET",
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    });

    return res;
  };
  // const ori_data = await getTesting();
  // const ori_json = await ori_data.json();

  const fetchTesting = async () => {
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

    return res;
  };
  const res = await fetchTesting();
  expect(res.status).toBe(200);
  const new_data = await getTesting();
  expect(new_data.status).toBe(200);
  const new_json = await new_data.json();
  expect(new_json[0].rank).toMatchObject(rank);

  // const restoreData = async () => {
  //   const res = await fetch(process.env.REACT_APP_API_URL, {
  //     method: "POST",
  //     headers: {
  //       Authorization: process.env.REACT_APP_API_KEY,
  //       "Content-Type": "application/json"
  //     },

  //     body: JSON.stringify(ori_leaderboard[0]),

  //   });
  // }

  // const restoration = await restoreData();
  // expect(restoration.status).toBe(200);
  // const restoration_data = await getTesting();
  // expect(restoration_data.status).toBe(200);
  // const restoration_json = restoration_data.json();
  // expect(restoration_json[0]).toMatchObject(ori_leaderboard[0]);
});

jest.setTimeout(99999);
// async function test() {
//   let res = fetch(process.env.REACT_APP_API_URL)
//     .then((res) => console.log(res))
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//       expect(res).toBe({ message: "unauthoriazed" });
//     });
// }

// test();
// it("testing fetching database", async () => {
//   let res = fetch(process.env.API_URL).then(res => res.json());

//   let data = res.data;
//   console.log(data);
// });
