import service from "../services/auth.service.js";

export const signUp = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Contenido vacío' });
    }
    const result = await service.signUp(req, res);

    if (result?.error !== undefined) {
        res.status(result.error.code).send({
            message: result.error.message || 'Ocurrió un error',
        })
    }
    res.status(201).json({ token: result });
}

export const signIn = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Contenido vacío' });
    }

    const result = await service.singIn(req, res);
    console.log(result);
    if (result?.error !== undefined) {
        res.status(result.error.code).send({
            message: result.error.message || 'Ocurrió un error',
        })
    }
    res.status(200).json({ result });

}
