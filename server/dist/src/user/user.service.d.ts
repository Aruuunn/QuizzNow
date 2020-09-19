import { Connection } from 'typeorm';
export declare class UserService {
    private readonly connection;
    private userRepo;
    constructor(connection: Connection);
    findByEmail: (email: string) => Promise<import("./user.entity").default>;
}
