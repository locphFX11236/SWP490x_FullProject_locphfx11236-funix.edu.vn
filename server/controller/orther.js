exports.PostImg = (req, res, next) => {
	const data = req.body;
	console.log(data);
	const response = { url: "public/asset/img/boat.png" };
	return res.json(response);
};
