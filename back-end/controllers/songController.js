const express = require("express");
const songs = express.Router();
// controllers/bookmarkController.js
const reviewsController = require("./reviewsController.js");
songs.use("/:songs_id/reviews", reviewsController);
const { getAllSongs ,getSong,createSong,deleteSong,updateSongs} = require("../queries/song");

//validations

const {
  checkBoolean,
  checkName,
  validateURL,
} = require("../validations/checkSongs.js");

songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "server error" });
  }
});



songs.get("/:id", async (req,res)=>{
const {id}=req.params
const oneSong= await getSong(id);
if(oneSong){

    res.status(200).json(oneSong)
}else{

    res.status(500).json({error:'server error'})
}


})

songs.post("/",checkBoolean,checkName,validateURL, async (req,res)=>{

const song=req.body

const newSong= await createSong(song);
if(newSong){

    res.status(200).json(newSong)
}else{
    res.status(500).json({error:"server Error"})
}


})


songs.delete("/:id", async (req,res)=>{
    const {id}= req.params;
    const deletedSong= await deleteSong(id)
    if(deletedSong.id){

        res.status(200).json(deletedSong)
    }else{
     res.status(400).json('Song was not found')   
    }



})

songs.put("/:id",checkBoolean,checkName,validateURL, async(req,res)=>{


const {id}= req.params
const{body}=req.body
const updatedSong= await updateSongs(id,body);
res.status(200).json(updatedSong)

})

module.exports = songs;