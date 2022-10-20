const Company =require("../../../models/company")

const createCompany = async (req, res) => {
    try {
        console.log(req.body);
        const user = new Company(req.body);

        const result = await user.save()
        console.log("company create successfully" ,result);
        res.status(201).send(result)
    } catch (e) { res.status(400).send(e) }
}

module.exports = createCompany