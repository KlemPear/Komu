module.exports.hasSelectedAKomu = async (req, res, next) => {
	try {
    if(req.headers.komu_id){
      next();
    } else {
      return res.status(400).json({error: "Could not find a komu_id header in the request."})
    }
	} catch (error) {
    console.log("HasSelectedAKomu Error: ", error);
		return res.status(400).json(error);
	}
};