import express from "express";
import supabase from "./supabase.js";

const app = express();
app.use(express.json());

app.get("/videogames", async (req, res) => {
  const { data, error } = await supabase.from("Video Games").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

app.get("/videogames/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("Video Games")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data)
});

app.post("/videogames", async (req, res) => {
  const { name, creator, description, tags, price } = req.body;

  const newGame = {
    name,
    creator,
    description,
    tags,
    price,
  };

  const { data, error } = await supabase
    .from("Video Games")
    .insert(newGame)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});
