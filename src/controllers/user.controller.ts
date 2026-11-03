import { Request, Response } from 'express';

// GET /api/users
export const getUsers = (req: Request, res: Response) => {    
    res.json({
        code: "200_OK",
        1: {
            name: "Molina",
            lastname: "Mollinedo"
        },
        2: {
            name: "Jorge",
            lastname: "Martinez"
        },
        3: {
            name: "Michael",
            lastname: "Scott"
        },
        4: {
            name: "Guillermo",
            lastname: "Isaac"
        },
        5: {
            name: "Mecha",
            lastname: "Mau"
        },
    });
};

// GET /api/users/:id
export const getUserById = (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        code: "200_OK",
        data: {
            id: id,
            name: "Molina",
            lastname: "Mollinedo"
        }
    });
};
