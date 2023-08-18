import service from "../services/skaters.service.js";

export const signUp = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'content can not be empty' });
    }
    
    const result = await service.signUp( req , res);

    if (result?.error !== undefined) {
        res.status(result.error.code).send({
            message: result.error.message || 'Some error ocurred!',
        })
    }
    res.status(201).json({token:result});
}

export const singIn = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'content can not be empty' });
    }

    const result = await service.singIn(req, res);
    console.log(result);
    if (result?.error !== undefined) {
        res.status(result.error.code).send({
            message: result.error.message || 'Some error ocurred!',
        })
    }
    res.status(200).json({ result });

}
