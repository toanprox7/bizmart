import jwt from "jsonwebtoken";
export const tokenAuthorization = jwt.sign({ admin: 'bizmart' }, 'toanpro');