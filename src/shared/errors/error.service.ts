import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from 'http-status-codes';

export default function (req: Request,
                         res: Response,
                         next: NextFunction | null,
                         err?: any,
                         message?: string) {
    handleError(req, res, err, message);
}

export function handleError(req: Request,
                            res: Response,
                            err?: any,
                            message?: string) {


    if (typeof err === 'string') {
        return res.status(BAD_REQUEST).json({ message: err });
    }

    if (err.name === 'NotFound') {
        return res.status(NOT_FOUND).json({ message: message || err.message });
    }

    if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).json({ message: message || err.message });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(UNAUTHORIZED).json({ message: message || 'Invalid Token' });
    }

    return res.status(INTERNAL_SERVER_ERROR).json({ message: message || err.message });
}
