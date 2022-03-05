import fetch from "node-fetch";
console.log(process.env.REACT_APP_API_URL);
async function test() {
  let data = fetch(process.env.REACT_APP_API_URL, {
    method: "GET",
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));

  // let data = res.data;
  console.log(data);
}

test();
// it("testing fetching database", async () => {
//   let res = fetch(process.env.API_URL).then(res => res.json());

//   let data = res.data;
//   console.log(data);
// });
