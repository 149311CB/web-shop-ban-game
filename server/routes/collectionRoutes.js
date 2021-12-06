import express from 'express'
import {getColections, addCollection, deleteCollection, getColection, getCollectionByName } from '../controllers/collectionSchema.js'

const router = express.Router()

router.get("/", getColections)
router.post("/add", addCollection)
// router.route("/delete/:id").get(getColection).delete(deleteCollection)
router.route("/name").get(getCollectionByName)


export default router
