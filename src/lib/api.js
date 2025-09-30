import axios from "axios";

export async function getPosts() {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
