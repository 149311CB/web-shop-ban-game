import express from 'express'
import { getVocherList, getVocher } from '../controllers/vocherControllers.js'

const router = express.Router()

router.get("/", getVocherList)

router.get('/:Id', getVocher)

export default router
