import asyncHandler from "express-async-handler";
import Vocher from "../models/vocherSchema.js";

const getVocherList = asyncHandler(async (_, res) => {
    const vochers = await Vocher.find({})
    res.json(vochers);
});

const getVocher = asyncHandler(async (req, res) => {
    const vocher = await Vocher.findById(req.params.Id)
    .populate("list_game")
    res.json(vocher);
});

export { getVocherList, getVocher};
