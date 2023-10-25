export async function getCharacter(value, categoryId) {
  const data = await fetch(`http://localhost:3000/search?name=${value}`);

  //   let data;
  // if (!categoryId) {
  //   data = await fetch(`http://localhost:3000/search?name=${value}`);
  // } else {
  //   data = await fetch(
  //     `http://localhost:3000/search?name=${value}&categoryId=${categoryId}`
  //   );
  // }
  const response = await data.json();
  if (response === undefined || response.error) {
    throw new Error(`HTTP Error! Status ${response.error}`);
  }
  return response;
}
